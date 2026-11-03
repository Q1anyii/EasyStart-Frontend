import { useState } from "react";


function MyCounter() {
    { /*`count++` 改了变量但 React 不知道 */}
    const [count, setCount] = useState(0);
    
    return (
        <div className="card">
            <h3>计数器（useState 演示）</h3>
            <p>当前值：{count}</p>
            { /*花括号里是表达式，`setCount(0)` 渲染时就被执行了；
            箭头函数是"先存着，点击才执行" */}
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    );
};

export default MyCounter;