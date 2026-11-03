import { useState } from "react";

// ========== 第3课：state 与事件处理 ==========
// useState：让组件"记住"一个会变的值
// 语法：const [值, 改值的函数] = useState(初始值)
//   count    → 读值（渲染时用）
//   setCount → 改值（改完 React 自动重新渲染组件）

function Counter() {
  // count 是 state：它变了，组件自动重渲染，页面跟着变
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h3>计数器（useState 演示）</h3>
      <p>当前值：{count}</p>
      {/* onClick 接收一个"函数"，不是"函数调用结果" */}
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}

export default Counter;
