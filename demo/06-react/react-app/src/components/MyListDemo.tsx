import { useState } from "react";

interface MyTodo {
    id: number;
    text: string;
    done: boolean;
}

const initialMyTodos: MyTodo[] = [
  { id: 1, text: "学习条件渲染", done: true },
  { id: 2, text: "学习列表渲染", done: false },
  { id: 3, text: "理解 key 的意义", done: false },
];

function MyListDemo() {
    const [todos, setTodos] = useState<MyTodo[]>(initialMyTodos);
    const [showDone, setShowDone] = useState(false);
    const [newTodoText, setNewTodoText] = useState("");

    const visibleTodos = showDone ? todos : todos.filter((t) => !t.done);
    const remaining = todos.filter((t) => !t.done).length;

    function commit() {
        setTodos((currentTodos) => [
                            ...currentTodos,
                            {
                                id: Math.max(0, ...currentTodos.map((todo) => todo.id)) + 1,
                                text: newTodoText.trim(),
                                done: false,
                            },
                        ]);
                        setNewTodoText("");
    }

    return (
        <div className="card">
            <h3>条件渲染与列表渲染</h3>

            
            {/* 这个&&反倒是像if-else，不过既然这里无法使用语句，
            那么就让&&充当表达式的作用 
            */}
            {todos.length === 0 && <p className="empty">暂无待办，添加一个吧</p>}
            <ul>
                {todos.map((t) => (
                    <li key={t.id}>
                        {t.text}
                        <button onClick={() => {
                            if (t.done) {
                                setTodos(todos.filter((todo) => todo.id !== t.id));
                            } else {
                                setTodos(todos.map((todo) =>
                                    todo.id === t.id ? { ...todo, done: true } : todo
                                ));
                            }
                        }}>{t.done ? "删除" : "done"}</button>
                    </li>
                ))}
            </ul>
            <input
                value={newTodoText}
                onChange={(event) => setNewTodoText(event.currentTarget.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" && newTodoText.trim()) {
                        commit();
                    }
                }}
            />
            <button onClick={() => {
                commit();
            }}>添加</button>
            {/* filter 返回新数组，原数组不变，新引用触发 React 重渲染*/}
            <button onClick={() => setTodos(todos.filter((t) => !t.done))}>清除已完成</button>
            
        </div>
    )
};

export default MyListDemo;