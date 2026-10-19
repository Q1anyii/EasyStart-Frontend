/**
 * mock.ts —— 没有真实后端时，模拟一个 SSE 响应
 *
 * 关键点：这里构造的 Response 和真实后端返回的完全同构
 * （text/event-stream + data: 帧 + \n\n 分隔），所以前端解帧
 * 代码走的是真实路径 —— 换真后端时只改 URL，其他一行不用动。
 */
const encoder = new TextEncoder()

/**
 * 把一段文本模拟成"逐字流式"的 SSE 响应。
 * @param text  要模拟输出的完整文本
 * @param speed 每个字符间隔（毫秒）
 * @param reasoning 推理过程（可选）
 */
export function mockChatResponse(text: string, speed = 25, reasoning?: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // ① 先流推理过程（模拟 Mitta 的 reasoning 事件）
      if (reasoning) {
        for (const ch of reasoning) {
          const frame = `data: ${JSON.stringify({ reasoning: ch })}\n\n`
          controller.enqueue(encoder.encode(frame))
          await new Promise((r) => setTimeout(r, speed))
        }
      }
      // ② 再流正文（原逻辑不动）
      for (const ch of text) {
        const frame = `data: ${JSON.stringify({ content: ch })}\n\n`
        controller.enqueue(encoder.encode(frame))
        await new Promise((r) => setTimeout(r, speed))
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
