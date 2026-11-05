import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// 初始数据：每项带唯一 id（id 是 key 的依据，不能重复）
const initialTodos: Todo[] = [
  { id: 1, text: "学习条件渲染", done: true },
  { id: 2, text: "学习列表渲染", done: false },
  { id: 3, text: "理解 key 的意义", done: false },
];

// ============================================================
// 第4课：条件渲染与列表渲染
//
// 【条件渲染】界面某块"要不要出现"由条件决定，两种写法：
//   ① && 短路：{条件 && <JSX>}  条件为 true 才渲染右边（false 时整块消失）
//   ② 三元：  {条件 ? <A> : <B>} 二选一
//
// 【列表渲染】数组 → JSX 列表，三步：
//   ① map 遍历数组，返回 JSX
//   ② 每项必须写 key（React 靠 key 认出"哪一项变了"，不写会警告）
//   ③ key 用唯一 id，不用索引/文本（见任务4）
//
// 【派生数据】不直接改 state，而是从 state 用 filter 算出一个新数组来渲染。
//   这样 state 始终是"真数据"，页面显示的是"计算出来的视图"。
// ============================================================

function ListDemo() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [showDone, setShowDone] = useState(false);

  // 派生列表：showDone 为 false 时，只显示未完成项（filter 不动原数组）
  const visibleTodos = showDone ? todos : todos.filter((t) => !t.done);
  // 派生数字：剩余未完成数量
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="card">
      <h3>条件渲染与列表渲染</h3>

      {/* 条件渲染① && 短路：todos 为空时，渲染空状态提示 */}
      {todos.length === 0 && <p className="empty">暂无待办，添加一个吧</p>}

      {/* 条件渲染② 三元：按钮文案二选一 */}
      <button onClick={() => setShowDone(!showDone)}>
        {showDone ? "隐藏已完成" : "显示已完成"}
      </button>

      {/* 重置：把 todos 恢复成初始数据（示例自洽用，非任务内容） */}
      <button onClick={() => setTodos(initialTodos)}>重置</button>

      {/* 派生数字：filter 算出来的 */}
      <p>剩余 {remaining} 项未完成</p>

      {/* 列表渲染：map 遍历派生列表，key 用唯一 id */}
      <ul>
        {visibleTodos.map((t) => (
          <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListDemo;

// ============================================================
// 改动任务（做完在 LEARNLOG 打卡，用时口报）：
//
// 任务1 · 空状态实验：把 initialTodos 改成 []，看 && 空状态出现；
//        再改回原数据。注释写：&& 的"短路"是什么意思
//
// 任务2 · 清除已完成：加一个按钮
//        onClick={() => setTodos(todos.filter((t) => !t.done))}
//        注释写：为什么 filter 返回新数组就能触发重渲染（第3课学过）
//
// 任务3 · 单行删除：每行 li 加"删除"按钮，用 id 删除
//        onClick={() => setTodos(todos.filter((item) => item.id !== t.id))}
//        注释写：对比第3课按索引删（filter((_, i) => i !== 索引)），
//        为什么用 id 更稳（删除中间行后索引会错位，id 不会）
//
// 任务4 · key 实验：把 key={t.id} 改成 key={t.text}，给初始数据加两条
//        相同文字的待办，看浏览器控制台 React 警告；改回 key={t.id}
//        注释写：key 为什么必须唯一
// ============================================================
