import { useState } from "react";

interface TodoInputProps{
    onAdd: (text: string) => void;
};
const TodoInput = ({ onAdd }: TodoInputProps) => {
    const [text, setText] = useState<string>("");

    return (
        <div className="card">
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => 
            {
                onAdd(text);
                setText("");
            }
            }>提交</button>
        </div>
    )
    
}

function TodoApp() {
    const [todos, setTodos] = useState<string[]>([]);

    const handleAdd = (text: string) => setTodos([...todos, text]);

    return (
        <div className="card">
            <h3>我的待办</h3>
            <ul>
                {todos.map((t, i) => 
                <li key={t}>{t}
                <button onClick={() => 
                    setTodos(todos.filter((_, index) => index !== i))}>删除
                </button>
                </li>
                )}
            </ul>
            <TodoInput onAdd={handleAdd} />
        </div>
    )
};

export default TodoApp;