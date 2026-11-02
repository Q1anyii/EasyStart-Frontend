// name?: string —— 可选字段（TS 课学过：? = 可不传）
// 不传时用默认值 "游客"；传了必须是 string，传 number 会编译报错
interface GreetingProps {
  name?: string;
}

function Greeting({ name = "游客" }: GreetingProps) {
  return <p>你好，{name}！</p>;
}

export default Greeting;
