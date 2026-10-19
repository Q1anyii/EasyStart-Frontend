/**
 * useChatStream.ts —— 对话流式渲染的核心逻辑（练手版）
 *
 * 复刻 Mitta 前端的三个关键思路：
 *   1. 手搓 SSE：fetch + ReadableStream 解帧（不用 EventSource——
 *      因为要带 Authorization 头、要 POST、要能 abort）
 *   2. 消息管理：assistant 消息先放一个"占位"，流式过程中只改它的 content
 *   3. 停止：AbortController.abort() 断开流
 *
 * 本文件不依赖任何 UI 框架代码，是纯逻辑组合式函数（Vue3 的 hook）。
 */
import { ref } from 'vue'
import type { ChatMessage, SSEChunk } from '../types'
import { mockChatResponse } from '../mock'

/**
 * 练习开关：true = 用本地 mock 数据（不依赖后端）
 * 接真实后端时改成 false，并把下面的 URL 换成你的接口即可。
 * 这个开关也演示了一个工程习惯：把"数据来源"做成可切换的，
 * 前端开发可以不等后端联调。
 */
const USE_MOCK = true
const CHAT_API_URL = '/api/chat/'

/** 生成唯一 id（模拟 Mitta 前端的 cm_<ts36>_<rand> 思路） */
function genId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

/**
 * SSE 解帧：把 fetch 返回的字节流，按 \n\n 切成一个个 JSON 事件。
 *
 * 这是 Mitta 前端最核心的一小段代码（app.js apiChat 内部）。
 * 为什么这么写？
 *   - response.body 是 ReadableStream，要自己 read() 拿字节
 *   - 网络传输可能把一个事件拆成两半（或两个事件粘在一起），
 *     所以必须 buffer 拼接 + split('\n\n')，最后一段不完整就留下次拼
 *
 * 用法：
 *   for await (const chunk of parseSSE(response)) { ... }
 */
async function* parseSSE(response: Response): AsyncGenerator<SSEChunk> {
  const reader = response.body!.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    // TextDecoder 带 { stream: true }：处理多字节字符被拆到两次 read() 的情况
    buffer += decoder.decode(value, { stream: true })

    // 按 SSE 规范：事件之间用空行（\n\n）分隔
    const events = buffer.split('\n\n')
    buffer = events.pop()! // 最后一段可能不完整，留到下次 read() 再拼

    for (const event of events) {
      // 只处理 data: 开头的行（SSE 标准格式）
      if (!event.startsWith('data:')) continue
      const payload = event.slice(5).trim()

      // 流结束标记（Mitta 后端约定）：跳过，让循环自然结束
      if (payload === '[DONE]') continue

      try {
        yield JSON.parse(payload) as SSEChunk
      } catch {
        // 解析失败跳过这一帧，不能中断整个流
        console.warn('忽略无法解析的 SSE 帧:', payload)
      }
    }
  }
}

/**
 * 组合式函数入口：返回 { messages, isLoading, send, stop }
 *
 * 关键设计：messages 是一个 ref 数组，流式过程中反复修改的是
 * 最后一条 assistant 消息的 content —— Vue 响应式会自动重渲染，
 * 但我们不追求每个 token 都刷一次（Mitta 里是 100ms 节流，这里从简）。
 */
export function useChatStream() {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)

  /** AbortController 引用：stop() 时用它断开 fetch 流 */
  let abortController: AbortController | null = null

  /** 当前正在流式生成的消息 id（防止多轮发送时错位） */
  let streamingMsgId: string | null = null

  /**
   * 真正的请求入口：POST /api/chat/，拿回流式响应后逐帧渲染。
   *
   * 练习重点：对照 Mitta 的 apiChat，注意三件事——
   *   1. body 里带 client_message_id（幂等键的前端来源）
   *   2. signal 传 abortController.signal（停止靠它）
   *   3. 拿到 response 后不要 res.json()，而是走 parseSSE 解帧
   */
  async function streamChat(body: Record<string, unknown>, onChunk: (c: SSEChunk) => void) {
    abortController = new AbortController()
    try {
      // mock 和真实请求走同一条解帧路径：都是拿到一个 Response 再 parseSSE
      const response = USE_MOCK
        ? mockChatResponse('这是一条模拟的流式回复。\n\n接真实后端时，把 USE_MOCK 改成 false 即可，这里会走 fetch 请求：POST ' + CHAT_API_URL, 25, '正在检索资料…\n分析用户问题…\n生成回答…',)
        : await fetch(CHAT_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 真实项目这里带 Authorization: Bearer <token>
              // （这就是为什么不能用 EventSource —— 它不能自定义 header）
            },
            body: JSON.stringify({
              client_message_id: genId('cm'),
              ...body,
            }),
            signal: abortController.signal,
          })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      for await (const chunk of parseSSE(response)) {
        onChunk(chunk)
      }
    } catch (e) {
      // AbortError 是主动停止，不算错误
      if ((e as Error).name === 'AbortError') return
      throw e
    }
  }

  /**
   * 发送一条消息。
   *
   * 流程（与 Mitta 一致）：
   *   1. 推一条 user 消息
   *   2. 推一条 assistant 占位（content 为空，status='streaming'）
   *   3. 开流，每个 chunk 把 content 增量 append 到占位上
   *   4. done / 结束 → 占位标记 done
   */
  let reasoningMsgId: string | null = null
  
  async function send(text: string) {
    if (!text.trim() || isLoading.value) return

    const userMsg: ChatMessage = { id: genId('u'), role: 'user', content: text, status: 'done' }
    const aiMsg: ChatMessage = { id: genId('a'), role: 'assistant', content: '', status: 'streaming' }
    const reasoningMsg: ChatMessage = { id: genId('r'), role: 'assistant', content: '', status: 'streaming', kind: 'reasoning' }

    messages.value.push(userMsg, reasoningMsg, aiMsg)
    streamingMsgId = aiMsg.id
    reasoningMsgId = reasoningMsg.id
    isLoading.value = true

    try {
      await streamChat(
        { query: text, thread_id: 'practice-thread' },
        (chunk) => {
          if (chunk.reasoning) {
            const target = messages.value.find((m) => m.id === reasoningMsgId)
            if (target) {
              target.content += chunk.reasoning
            }
          }
          // 只更新"当前正在流式的那条"assistant 消息
          const target = messages.value.find((m) => m.id === streamingMsgId)
          if (!target) return

          if (chunk.error) {
            target.status = 'error'
            target.error = chunk.error
          } else if (chunk.done) {
            target.status = 'done'
          } else if (chunk.content) {
            target.content += chunk.content // 核心：增量 append
          }
        },
      )
    } catch (e) {
      const target = messages.value.find((m) => m.id === streamingMsgId)
      if (target) {
        target.status = 'error'
        target.error = (e as Error).message
      }
    } finally {
      const r = messages.value.find((m) => m.id === reasoningMsgId)
      if (r && r.status === 'streaming') {
        r.status = 'done'
      }
      isLoading.value = false
      streamingMsgId = null
      reasoningMsgId = null
    }
  }

  /** 停止生成：abort 掉 fetch 流（Mitta 的 /stop 接口其实是空壳，靠的就是这个） */
  function stop() {
    abortController?.abort()
  }

  return { messages, isLoading, send, stop }
}
