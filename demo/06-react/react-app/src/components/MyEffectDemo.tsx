import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

function MyEffectDemo() {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    function floorFixed(val: number, digits: number) {
        const base = 10 ** digits
        return Math.floor(val * base) / base
    }   

    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => setSeconds((s) => s + 0.1), 100);
        //如果不手动clear，轮询还会继续
        return () => clearInterval(id);
        //如果为空，那么后续无法进行渲染，因为为空 effect 不再重跑
    }, [running]); 

    const [note, setNote] = useState("");

    useEffect(() => {
        console.log(`${Date.now()}:[挂载 effect] 从 localStorage 读便签`);
        setNote(localStorage.getItem("effect-demo-note") ?? "");
    }, []);//每次刷新，第一次渲染时获取缓存

    useEffect(() => {
        if (!note) return;
        localStorage.setItem("effect-demo-note", note);
        console.log(`${Date.now()}:[变化 effect] 从 localStorage 写便签`);
    }, [note]); //note 变化时，会同步写缓存,类似于监听

    return (
        <div className="card">
            <h3>useEffect 与副作用</h3>
            <p>计时：{floorFixed(seconds, 1)} 秒</p>
            <button onClick={() => setRunning(!running)}>
                {running ? "暂停" : "开始"}
            </button>
            <p>
                便签（自动保存，刷新页面还在）：{" "}
                <input
                    value={note}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
                />
            </p>
        </div>
    )
};

export default MyEffectDemo;