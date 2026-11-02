// 单向数据流实战：数据由父组件（App）持有，通过 items prop 传下来
// 子组件只读 props，不能改——想改数据要等第3课的 state
interface TodoListProps {
  items: string[];
}

function TodoList({ items }: TodoListProps) {
  return (
    <ul>
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

export default TodoList;
