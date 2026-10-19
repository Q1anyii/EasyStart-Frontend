<script setup lang="ts">
/**
 * App.vue —— 对话界面（练手版）
 *
 * 对应 Mitta 前端的消息区 + 输入区。
 * 练 Vue3 组合式 API 的重点：script setup 里 ref 变量 = 模板里直接用，
 * 不需要 this、不需要 data() 选项。
 */
import { nextTick, ref, watch } from 'vue'
import { useChatStream } from './composables/useChatStream'
import type { ChatMessage } from './types'

// 组合式函数：消息数组 / 加载状态 / 发送 / 停止
const { messages, isLoading, send, stop } = useChatStream()

// 输入框内容（v-model 双向绑定）
const input = ref('')

// 消息容器 DOM 引用：用于流式时自动滚到底部
const containerRef = ref<HTMLElement | null>(null)

/**
 * 监听 messages 变化（流式过程中 content 每次 append 都会触发），
 * 在 DOM 更新后滚到底部 —— 对应 Mitta 的 requestAnimationFrame 合并滚动，
 * 这里从简：nextTick 确保新内容已经渲染再滚。
 */
watch(messages, async () => {
  await nextTick()
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }
}, { deep: true })

/** 点发送：调 useChatStream 的 send，清空输入框 */
async function handleSend() {
  const text = input.value.trim()
  if (!text || isLoading.value) return
  input.value = ''
  await send(text)
}

/** 按 Enter 发送（Shift+Enter 换行），对应聊天工具的常见交互 */
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function roleLabel(m: ChatMessage): string {
  if (m.role === 'user') return '你'
  if (m.kind === 'reasoning') return '推理中'
  return 'Mitta'
}

/** 渲染单条消息的样式类：user / assistant / error 三种 */
function msgClass(m: ChatMessage): string {
  if (m.status === 'error') return 'msg msg-error'
  if (m.kind === 'reasoning') return 'msg msg-reasoning'   // 推理气泡独立样式
  return m.role === 'user' ? 'msg msg-user' : 'msg msg-assistant'
}

/** 是否显示打字光标（正在流式的那条消息） */
function isStreaming(m: ChatMessage): boolean {
  return m.status === 'streaming'
}
</script>

<template>
  <div class="chat-app">
    <!-- 消息列表：v-for 渲染，:key 用消息 id（Vue 列表渲染的规范） -->
    <div ref="containerRef" class="msg-list">
      <div v-for="m in messages" :key="m.id" :class="msgClass(m)">
        <div class="msg-role">{{ roleLabel(m) }}</div>
        <!--
          流式中的消息保留空白字符渲染（white-space: pre-wrap），
          否则换行符会被折叠 —— 这是流式渲染最容易踩的坑
        -->
        <div class="msg-content" :class="{ streaming: isStreaming(m) }">
          {{ m.content }}
          <!-- 打字光标：流式未结束时显示 -->
          <span v-if="isStreaming(m)" class="cursor">▍</span>
          <span v-else-if="m.status === 'error'" class="err-text">（{{ m.error }}）</span>
        </div>
      </div>

      <!-- 空状态提示 -->
      <div v-if="messages.length === 0" class="empty-hint">
        输入一句话试试 —— 这是一条用 mock SSE 流式输出的回复
      </div>
    </div>

    <!-- 输入区 -->
    <div class="input-bar">
      <textarea
        v-model="input"
        :disabled="isLoading"
        placeholder="输入消息，Enter 发送，Shift+Enter 换行"
        rows="1"
        @keydown="handleKeydown"
      ></textarea>
      <!-- 流式时显示"停止"，否则显示"发送" —— 对应 Mitta 的 AbortController 停止 -->
      <button v-if="isLoading" class="btn stop" @click="stop">■ 停止</button>
      <button v-else class="btn send" :disabled="!input.trim()" @click="handleSend">发送</button>
    </div>
  </div>
</template>

<style scoped>
.chat-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 720px;
  margin: 0 auto;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  overflow: hidden;
}
.msg-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #fafafa;
}
.msg {
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 85%;
}
.msg-user {
  margin-left: auto;
  background: #4f7cff;
  color: #fff;
}
.msg-assistant {
  background: #fff;
  border: 1px solid #e2e2e2;
}
.msg-error {
  background: #fff0f0;
  border: 1px solid #ffb3b3;
}
.msg-role {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}
.msg-user .msg-role {
  color: rgba(255, 255, 255, 0.85);
}
.msg-content {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  font-size: 14px;
}
.msg-reasoning {
  background: #f5f5f5;
  color: #888;
  font-size: 13px;
  font-style: italic;
}
.cursor {
  animation: blink 0.8s step-end infinite;
  color: #4f7cff;
}
@keyframes blink {
  50% { opacity: 0; }
}
.err-text {
  color: #d33;
  font-size: 12px;
}
.empty-hint {
  text-align: center;
  color: #aaa;
  padding: 40px 0;
  font-size: 14px;
}
.input-bar {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e2e2e2;
  background: #fff;
}
.input-bar textarea {
  flex: 1;
  resize: none;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
}
.input-bar textarea:focus {
  border-color: #4f7cff;
}
.btn {
  border: none;
  border-radius: 8px;
  padding: 0 18px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
}
.btn.send {
  background: #4f7cff;
}
.btn.send:disabled {
  background: #c4d2ff;
  cursor: not-allowed;
}
.btn.stop {
  background: #e8604c;
}
</style>
