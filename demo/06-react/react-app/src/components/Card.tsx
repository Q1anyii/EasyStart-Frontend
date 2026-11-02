import type { ReactNode } from "react";

// TS 课学的 interface 在这里实战：定义 Card 组件的 props 类型
// 编辑器里输入 <Card 就会提示 title/children，传错类型立刻红线
interface CardProps {
  title: string;
  children: ReactNode; // ReactNode = "任意可渲染内容"，children 的 TS 类型
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default Card;
