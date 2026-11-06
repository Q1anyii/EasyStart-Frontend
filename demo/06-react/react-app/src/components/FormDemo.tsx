import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  opinion: string;
  city: string;
  agreed: boolean;
}

// ============================================================
// 第5课：表单与受控组件
//
// 【受控组件】表单元素的值不归 DOM 自己管，而是归 React state 管：
//   value={state} 负责"显示"，onChange 负责"把新值写回 state"。
//   这叫"单一数据源"——state 是唯一真相，输入框只是它的显示屏。
//   对比：不受控输入框 = DOM 自己记值，React 想读得用 ref 去捞（第6课）
//
// 【React 表单三注意】
//   ① textarea 用 value，不写标签中间的文字
//   ② select 的 value 放在 select 上，不在 option 上
//   ③ checkbox / radio 用 checked，不用 value
//
// 【表单提交】onSubmit 里必须 e.preventDefault()，
//   否则浏览器按"传统方式"刷新页面，所有 state 瞬间清空。
// ============================================================

function FormDemo() {
  const [form, setForm] = useState<FormData>({
    name: "",
    opinion: "",
    city: "北京",
    agreed: false,
  });
  // 提交后的快照（null = 还没提交过）
  const [submitted, setSubmitted] = useState<FormData | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 阻止页面刷新
    setSubmitted(form);
  }

  return (
    <div className="card">
      <h3>表单与受控组件</h3>
      <form onSubmit={handleSubmit}>
        {/* input 受控：value 来自 state，onChange 写回 state */}
        <p>
          姓名：{" "}
          <input
            value={form.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </p>

        {/* textarea 受控：React 里用 value，不写标签中间 */}
        <p>
          意见：
          <textarea
            value={form.opinion}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setForm({ ...form, opinion: e.target.value })
            }
          />
        </p>

        {/* select 受控：value 在 select 上，不在 option 上 */}
        <p>
          城市：
          <select
            value={form.city}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setForm({ ...form, city: e.target.value })
            }
          >
            <option>北京</option>
            <option>上海</option>
            <option>广州</option>
          </select>
        </p>

        {/* checkbox 受控：用 checked，不用 value */}
        <p>
          <label>
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, agreed: e.target.checked })
              }
            />
            我已阅读条款
          </label>
        </p>

        <button type="submit">提交</button>
      </form>

      {/* 提交后预览：submitted 不为 null 才显示 */}
      {submitted && (
        <p>
          已提交：{submitted.name} / {submitted.city}（{submitted.opinion || "无意见"}）
        </p>
      )}
    </div>
  );
}

export default FormDemo;

// ============================================================
// 改动任务（做完在 LEARNLOG 打卡，用时口报）：
//
// 任务1 · 条款门槛：未勾选"我已阅读条款"时，提交按钮禁用：
//        <button type="submit" disabled={!form.agreed}>
//        注释写：disabled 的值从哪来？为什么 state 变了按钮就变灰
//
// 任务2 · 字数限制：意见框下方显示"已输入 N/50 字"，
//        超过 50 字时提交按钮也禁用（两个条件用 || 串起来）
//        注释写：为什么"已输入字数"不用单独存一个 state
//
// 任务3 · 加选项：select 里加一个"深圳"，选择它看 preview 变不变
//        注释写：选项是数据还是 state？（option 是写死的列表，value 才是 state）
//
// 任务4 · 统一 onChange：给 input/textarea/select 都加上 name 属性
//        （name="name" / name="opinion" / name="city"），写一个
//        function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }
//        把三个 onChange 全部换成 handleChange。
//        注释写：[e.target.name] 为什么能一处顶三处？（计算属性名，JS 学过）
//        提示：checkbox 仍单独用一个 onChange（它读的是 checked 不是 value）
// ============================================================
