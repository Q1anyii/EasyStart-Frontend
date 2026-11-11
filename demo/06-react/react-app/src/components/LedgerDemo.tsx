import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// ============================================================
// 第8课：组件化实战——用 React 重构记账本
//
// 阶段三你在一个 HTML 文件里手写完了这个记账本（录入 / 列表 / 合计 / 筛选 / 清空）。
// 今天不写新功能，只做一件事：**把它拆成组件**。
//
// 【重构要回答的三个问题】
//   ① 拆几个组件？——按"职责"拆，不按"行数"拆：
//        录入表单 / 筛选栏 / 列表 / 页面容器
//   ② state 放哪？——谁"拥有"数据，state 就放谁：
//        表单三个输入框归表单自己；records 和 filter 归页面容器
//   ③ 子组件怎么改数据？——不能改，只能"上报"：
//        子调 props 里的回调（onAdd / onDelete），由父组件真正 setState
//
// 【和原生 JS 版的对照】
//   原生：records 是全局变量，改了以后手动 save() + render()
 //   React：records 是 state，setRecords 之后框架自动重渲染；持久化交给 useEffect
//   "手动 render"这一步，整个被框架接管了——这就是声明式。
//
// 【为什么 localStorage 不用 removeItem】
//   React 里不需要"删除存储"这个动作：records 变成 [] 时，
//   useEffect 自动把 "[]" 写回去，等于清空。数据永远只有 state 一个源头。
//
// 【严格模式提醒】
//   开发模式下 effect 会跑两次（StrictMode 检验清理函数），
//   这里 effect 没有定时器/订阅，跑两次只是多写一次 localStorage，无害。
// ============================================================

// 一条记录的结构（和原生版的 {amount, category, note} 比，多了一个 id）
interface LedgerRecord {
  id: number;
  amount: number;
  category: string;
  note: string;
}

const CATEGORIES = ["餐饮", "交通", "购物", "其他"];

// ---------- 子组件 1：录入表单（受控 + 提交上报）----------
interface RecordFormProps {
  onAdd: (record: Omit<LedgerRecord, "id">) => void;
}

function RecordForm({ onAdd }: RecordFormProps) {
  // 三个输入框的 state 归表单自己——页面容器只关心"提交后的结果"
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault(); // 阻止表单默认提交（那会刷新页面）
    const num = Number(amount); // 输入框拿到的永远是字符串
    if (!num || num <= 0) return; // 守卫：空 / 0 / 负数都不记
    onAdd({ amount: num, category, note: note.trim() }); // 上报给父组件
    setAmount(""); // 清空，准备记下一笔
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          placeholder="金额（元）"
          type="number"
          step="0.01"
          min="0"
        />
        <select
          value={category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </p>
      <p>
        <input
          value={note}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
          placeholder="备注（可选）"
        />
        <button type="submit">记一笔</button>
      </p>
    </form>
  );
}

// ---------- 子组件 2：筛选栏（只负责显示和上报选择）----------
interface FilterBarProps {
  value: string;
  onChange: (value: string) => void;
}

function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      <option>全部</option>
      {CATEGORIES.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  );
}

// ---------- 子组件 3：列表（空状态 + 删除）----------
interface RecordListProps {
  records: LedgerRecord[];
  onDelete: (id: number) => void;
}

function RecordList({ records, onDelete }: RecordListProps) {
  // 空状态：注意这里没有"清空"和"无记录"的区分，任务里会让你补
  if (records.length === 0) {
    return <p style={{ color: "#94a3b8" }}>该类别下暂无记录</p>;
  }
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {records.map((r) => (
        <li
          key={r.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            padding: "7px 0",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <span>
            {r.category}｜{r.note || "无备注"}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            ¥{r.amount}
            <button onClick={() => onDelete(r.id)}>删</button>
          </span>
        </li>
      ))}
    </ul>
  );
}

// ---------- 主组件：持全部数据，负责持久化与派生 ----------
function LedgerDemo() {
  // 惰性初始化：useState 传"函数"时，这个函数只在首次渲染执行一次。
  // 好处：读 localStorage 只发生在拿到初始值时，省掉"先空数组再 effect 回填"的一次渲染。
  const [records, setRecords] = useState<LedgerRecord[]>(() => {
    const raw = localStorage.getItem("ledger");
    return raw ? (JSON.parse(raw) as LedgerRecord[]) : [];
  });
  const [filter, setFilter] = useState("全部");

  // records 一变就写回 localStorage——持久化的唯一出口
  useEffect(() => {
    localStorage.setItem("ledger", JSON.stringify(records));
  }, [records]);

  // 派生数据：不存 state，渲染时现算
  const visible =
    filter === "全部" ? records : records.filter((r) => r.category === filter);
  const total = visible.reduce((sum, r) => sum + r.amount, 0);

  function handleAdd(record: Omit<LedgerRecord, "id">) {
    setRecords([...records, { ...record, id: Date.now() }]);
  }

  function handleDelete(id: number) {
    setRecords(records.filter((r) => r.id !== id));
  }

  return (
    <div className="card">
      <h3>记账本（组件化重构）</h3>
      <RecordForm onAdd={handleAdd} />
      <p>
        筛选：<FilterBar value={filter} onChange={setFilter} />
      </p>
      <RecordList records={visible} onDelete={handleDelete} />
      <p style={{ textAlign: "right", marginTop: 8, fontWeight: 600 }}>
        合计：¥{total.toFixed(2)}
      </p>
    </div>
  );
}

export default LedgerDemo;

// ============================================================
// 改动任务（做完在 LEARNLOG 打卡，用时口报）：
//
// 任务1 · 拆出 RecordForm：
//        官方版已经把表单拆好了。你要做的是把"筛选栏"也拆出去（已经拆了），
//        然后反过来想：把三个输入的 state 也提到主组件 LedgerDemo 里，
//        由主组件统一管理（props 下传 value、回调上抬）。
//        对比两种写法：哪种 props 更少？哪种更难维护？
//
// 任务2 · 加"清空"按钮：
//        在列表上方加按钮，点击 setRecords([])。
//        注释写：为什么 React 里不需要 localStorage.removeItem？
//        刷新页面验证确实清空了。
//
// 任务3 · 空状态区分：
//        现在列表为空只有一句"该类别下暂无记录"。
//        改成两种情况分开：
//          - records（全部数据）为空 → "还没有记录，记一笔吧"
//          - 只是当前筛选结果为空 → "该类别下暂无记录"
//        提示：列表组件拿到的只是 visible，判断不了"全局是否为空"，
//        需要主组件再传一个参数下去。注释写：你传了什么、为什么。
//
// 任务4 · 合计口径思考 + 验证：
//        现在合计只算"当前筛选结果"。改成算"全部记录"的总金额，
//        注释写：两种口径各自的语义是什么？同时刷新页面验证数据持久化。
// ============================================================
