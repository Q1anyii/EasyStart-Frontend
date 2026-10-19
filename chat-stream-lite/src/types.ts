/**
 * types.ts —— 类型定义（练 TS 的第一课）
 *
 * 为什么单独建这个文件？
 * Mitta 前端的核心经验之一：把"数据结构"和"渲染逻辑"分开。
 * 消息长什么样、SSE 事件长什么样，先用 interface 钉死，
 * 后面写组件和函数时，编辑器会自动帮你检查拼写和字段错误。
 */

/** 一条聊天消息 */
export interface ChatMessage {
  id: string           // 唯一 id，用于 v-for 的 key
  role: 'user' | 'assistant'
  content: string      // 完整内容（流式过程中会不断变长）
  status: 'idle' | 'streaming' | 'done' | 'error'
  /** 可选的错误信息，status === 'error' 时展示 */
  error?: string
  kind?: 'reasoning' | 'answer'
}

/**
 * SSE 事件帧（后端推给前端的每一行 JSON）。
 *
 * 说明：真实 Mitta 后端会推 reasoning / tool_call_start / tool_call_end
 * / ack / done / error 等更丰富的事件；这里为了练手只保留最核心的
 * content / done / error 三个，理解了这三个，其余都是同类扩展。
 */
export interface SSEChunk {
  content?: string     // 正文增量（每次只带新增的那一小段）
  reasoning?: string    // 推理增量（每次只带新增的那一小段）
  done?: boolean       // true 表示正文流完
  error?: string       // 后端报错信息
}
