# React 学习工程（阶段六）

前端学习项目第 7 课提前：从 CDN 模式升级为真实工程（Vite + React + TS）。

## 为什么转工程

- CDN 模式下 `<script type="text/babel">` 里的 JSX 没有代码补全、没有类型检查
- 工程模式下 `.tsx` 文件由 VSCode 内置 TS 服务处理：**组件补全 + props 类型提示 + 类型检查全程在线**
- 这是真实开发的标准工作流（Mitta 前端以后也是这个形态）

## 常用命令

```bash
npm run dev    # 启动开发服务器（热更新，改代码浏览器自动刷新）
npm run build  # 类型检查 + 构建（验证代码没问题）
```

## 目录结构

```
react-app/
├── src/
│   ├── App.tsx              # 根组件（持有数据，向下传）
│   ├── components/          # 组件拆分
│   │   ├── Greeting.tsx     # 默认值 + 可选 props
│   │   ├── Card.tsx         # children + ReactNode
│   │   └── TodoList.tsx     # 单向数据流（items 只读）
│   ├── main.tsx             # 入口（替代 CDN 的 createRoot 那行）
│   └── index.css
├── index.html
├── package.json
└── tsconfig.json
```

## 学习进度

- [x] 第1课 JSX 与组件（CDN 版 `../react-intro.html`）
- [x] 第2课 props 与组件通信（CDN 版 `../props-communication.html`）
- [ ] 第3课 state 与事件处理（工程内学习）
- [ ] 第4课 条件渲染与列表渲染
- [ ] 第5课 表单与受控组件
- [ ] 第6课 useEffect 与副作用
- [ ] 第7课 组件化实战：重构记账本
- [ ] 第8课 路由 + 完整项目（AI 应用前端雏形）
