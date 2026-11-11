import { useState, useEffect, type FormEvent } from "react";
import type { ChangeEvent } from "react";

interface LedgerRecord{
    id: number;
    amount: number;
    category: string;
    note: string;
}

const CATEGORIES = ["餐饮", "交通", "购物", "其他"];

interface RecordFormProps {
  onAdd: (record: Omit<LedgerRecord, "id">) => void;
}

function RecordForm({onAdd} : RecordFormProps) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [note, setNote] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const num = Number(amount);
        if (!num || num <= 0) return;
        onAdd({ amount: num, category, note: note.trim() });
        setAmount("");
        setNote("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <p>
                <input
                    value={amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        setAmount(e.target.value)}
                    placeholder="金额（元）"
                    type="number"
                    step="0.01"
                    min="0"
                />
                <select 
                    value={category}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                        setCategory(e.target.value)}>
                            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
            </p>
            <p>
                <input
                    value={note}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        setNote(e.target.value)}
                    placeholder="备注（可选）"
                    type="text"
                ></input>
                <button type="submit">记一笔</button>
            </p>
        </form>
    )
};

interface FilterBarProps{
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

interface RecordListProps{
    records: LedgerRecord[];
    onDelete: (id: number) => void;
};


function RecordList({ records, onDelete}: RecordListProps) {
    if (!records || records.length === 0){
        return <p style={{ color: "#94a3b8" }}>该类别下暂无记录</p>;
    }
    return(
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
};



function MyLedgerDemo() {
    const [records, setRecords] = useState<LedgerRecord[]>(() => {
        const raw = localStorage.getItem("ledger");
        return raw ? (JSON.parse(raw) as LedgerRecord[]) : [];
    });
    
    const [filter, setFilter] = useState("全部");

    useEffect(() => {
        localStorage.setItem("ledger", JSON.stringify(records));
    }, [records]);

    const visible =
        filter === "全部" ? records : records.filter((r) => r.category === filter);
    
    const total = visible.reduce((sum, r) => sum + r.amount, 0);

    function handleAdd(record: Omit<LedgerRecord, "id">) {
        setRecords([...records, { ...record, id: Date.now() }]);
    };

    function handleDelete(id: number) {
        setRecords(records.filter((r) => r.id !== id));
    };

    function handleDeleteAll() {
        setRecords([]);
    };

    return (
        <div className="card">
            <h3>记账本（组件化重构）</h3>
            <RecordForm onAdd={handleAdd} />
            <p>
                筛选：<FilterBar value={filter} onChange={setFilter} />
                <button onClick={() => handleDeleteAll()}>清空</button>
            </p>
            {records.length === 0 && <p>还没有记录，记一笔吧</p>}
            {records.length !== 0 && <RecordList records={visible} onDelete={handleDelete} />}
            <p style={{ textAlign: "right", marginTop: 8, fontWeight: 600 }}>
                合计：¥{total.toFixed(2)}
            </p>
        </div>
    );
}

export default MyLedgerDemo;