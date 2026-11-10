import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

// ============================================================
// 第6课：useEffect 与副作用
//
// 【什么是副作用】渲染之外、会"影响外部世界"的事：
//   fetch 请求、setInterval 定时器、localStorage 读写、事件订阅、改 document.title……
//   纯渲染 = 从 state 算出 JSX（只读数据、不碰外界）；
//   副作用  = 渲染之外的动作（有"对外影响"或"时序依赖"）。
//   useEffect 就是"把副作用挂到正确时机执行"的钩子。
//
// 【三种依赖形态】
//   ① useEffect(fn, [])      → 只在"挂载"时执行一次（组件第一次出现）
//   ② useEffect(fn, [dep])   → 挂载时 + dep 每次变化时执行
//   ③ useEffect(fn)          → 每次渲染后都执行（危险：里面 setState 容易无限循环）
//
// 【清理函数】effect 里 return 一个函数，React 会在"下一次 effect 执行前 / 组件卸载时"调它：
//   return () => clearInterval(id)   → 防止定时器泄漏
//   有清理 = 旧的副作用会被收尾，没清理 = 旧定时器一直在跑。
//
// 【StrictMode 双跑】开发模式下 React 会故意把每个 effect 跑两次
//   （跑 → 清理 → 再跑），用来检验清理函数写没写对。
//   所以控制台看到日志出现两条、计数看起来"跳"，不要慌——生产环境只跑一次。
// ============================================================

function EffectDemo() {
  // ========== 演示①：定时器 + 清理函数 ==========
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // 依赖 [running]：开始/暂停切换时，这个 effect 会重建
    if (!running) return; // 暂停状态：什么都不做
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    // 清理：running 变回 false 或组件卸载时，把旧定时器清掉
    return () => clearInterval(id);
  }, [running]);

  // ========== 演示②：挂载时读 localStorage（[] 只跑一次）==========
  const [note, setNote] = useState("");

  useEffect(() => {
    console.log("[挂载 effect] 从 localStorage 读便签");
    setNote(localStorage.getItem("effect-demo-note") ?? "");
  }, []);

  // ========== 演示③：note 变化就写 localStorage（[note] 跟着变）====
  useEffect(() => {
    if (!note) return;
    localStorage.setItem("effect-demo-note", note);
  }, [note]);

  return (
    <div className="card">
      <h3>useEffect 与副作用</h3>

      <p>计时：{seconds} 秒</p>
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
  );
}

export default EffectDemo;

// ============================================================
// 改动任务（做完在 LEARNLOG 打卡，用时口报）：
//
// 任务1 · 暂停验证：点"开始"跑几秒 → "暂停" → 再"开始"，
//        观察计数是否连续、有没有跳变。
//        注释写：如果不写 return () => clearInterval(id) 会发生什么？
//
// 任务2 · 依赖实验：把 [running] 改成 []，再点"开始"，观察有没有反应。
//        想通为什么（[] 只在挂载时执行一次，那时 running 是 false，
//        直接 return 了，之后 running 变了 effect 不会再跑）。
//        改回 [running]。
//
// 任务3 · 刷新持久化：在便签里输入文字 → 刷新浏览器 → 看便签还在不在。
//        注释写：哪段代码负责"读"、哪段负责"写"，各自依赖数组是什么。
//
// 任务4 · 控制台对照：给演示②和③的 effect 各加一行
//        console.log(new Date().toLocaleTimeString(), "effect 执行")
//        然后刷新页面 + 在便签里打字，观察两条日志的出现次数差异。
//        注释写：依赖数组到底决定了什么？
// ============================================================
