import Greeting from "./components/Greeting";
import Card from "./components/Card";
import TodoList from "./components/TodoList";
import Counter from "./components/Counter";
import MyCounter from "./components/MyCounter";
import TodoApp from "./components/TodoApp";
interface User {
  name: string;
  role: string;
}

function App() {
  // 数据在父组件（App）：user 和 todos 都在这定义，往下传
  const user: User = { name: "郭同学", role: "前端学习者" };
  const todos = ["第1课 JSX与组件 ✅", "第2课 props通信 ✅", "第3课 state与事件 ✅"];

  return (
    <div className="app">
      <Greeting name={user.name} />
      <Greeting /> {/* 不传 name → 默认值"游客" */}

      <Card title="本周进度">
        <p>第1课 JSX与组件 ✅</p>
        <p>第2课 props通信 ✅</p>
        <p>第3课 state与事件 ✅</p>
        <p>第4课 条件渲染与列表渲染 ← 下一课</p>
      </Card>

      <Card title="待办">
        <TodoList items={todos} />
      </Card>

      <Counter />
      <MyCounter />
      <TodoApp />
    </div>
  );
}

export default App;
