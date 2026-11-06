import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData{
    name: string;
    opinion: string;
    city: string;
    agreed: boolean;
}

const city = ["北京","上海","深圳","广州"]

function MyFormDemo () {
    const [form, setForm] = useState<FormData>({
        name: "",
        opinion: "",
        city: "北京",
        agreed: false,
    })
    const [submitted, setSubmitted] = useState<FormData | null>(null);
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(form);
    }
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="card">
            <h3>表单与受控组件</h3>
            <form onSubmit={handleSubmit}>
            <p>姓名:{" "}  
                <input 
                    name="name"
                    value={form.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>{
                            handleChange(e)
                        }
                    }
                />
            </p>
            <p>意见：
                <textarea
                    name="opinion"
                    value={form.opinion}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                        handleChange(e)
                    }
                />
                已输入{form.opinion.length}/50字
            </p>
            <p>城市：
                <select
                    name="city"
                    value={form.city}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleChange(e)
                    }
                >
                    {city.map(c => <option>{c}</option>)}
                </select>
            </p>
            <p>
                <label>
                    <input
                        type="checkbox"
                        checked={form.agreed}
                        onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                    ></input>
                </label>我已阅读条款
            </p>
                {/*disable取决于form.agreed,字数当然不用单独存state，因为它是根据opinion动态计算的 */}
                <button 
                type="submit"
                disabled={!form.agreed || form.opinion.length > 50}
                >提交</button>
            </form>
            {submitted && (
                <p>已提交：{submitted.name} / {submitted.city}（{submitted.opinion || "无意见"}）</p>
            )}
        </div>
    )
};

export default MyFormDemo;