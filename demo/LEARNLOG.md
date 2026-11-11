# 前端学习打卡日志

> 用法：每完成一个 demo，在「打卡记录」表加一行（日期 / 知识点 / 卡点 / 用时 / 改动题）。
> 自述总结法：学完一个点，先自己完整复述一遍，卡壳就看文档，能说出来才算过。

## 每课学习流程（固定模板，每课都这样）

1. 浏览器打开本课的 demo 文件（双击即可），边看渲染效果边读代码注释
2. 自己新建一个副本文件（比如 `my-xxx.html`），**亲手逐字敲一遍，禁止复制粘贴**
3. 做文件底部的改动任务（阶段0是 4 个）——这是"看得懂→写得出"的关键一步
4. 完成后在本页「打卡记录」表打卡（日期 / 知识点 / 卡点 / 用时 / 改动题）
5. 自述总结：用自己的话把本课知识点完整复述一遍（阶段0是盒模型和 Flex），卡壳就看注释/文档

## 打卡记录

| 日期 | Demo | 知识点 | 卡点 | 用时 | 改动题 |
| --- | --- | --- | --- | --- | --- |
| 2026.10.20| HTML/CSS 回顾 | 盒子模型、弹性布局 | 无 | 10min | 添加一个盒子|
| 2026.10.20 19:09 | 第1课 my-index01（变量与数据类型） | let/const、5种基本类型、typeof、== vs ===、falsy清单、模板字符串、NaN三坑 | typeof NaN 反直觉、NaN === NaN 为 false、Boolean('0') 是真值、id自动变全局变量 | 30min | 任务1~8（任务5报错实验未补）+Set彩蛋 |
| 2026.10.21 19:09 | 第2课 my-index02（运算符与流程控制） | if/switch（break、===）、for/while、循环边界、隐式全局 vs let声明 | flag/j 忘声明（隐式全局）、switch缺break穿透、j<=i跑3次 | 30min | 3个待修任务全过 |
| 2026.10.22 19:52 | 第3课 my-index03（函数与作用域） | 函数声明/提升、箭头函数（单行隐式return/多语句显式return）、返回值、默认参数、作用域三层（全局/函数/块级）、let vs var | 任务2一开始写成花括号+显式return（没get到单行隐式return）、多余的&lt;/div&gt; | 30min | 4个改动任务全过（任务2修正为单行箭头） |
| 2026.10.22 20:24 | 第4课 my-index04（数组与常用方法） | 数组创建、push/pop增删、map/filter/find/reduce四件套、forEach | reduce回调只写一个参数导致cur被忽略（s+=s变成翻倍而非求和）、sum忘声明（隐式全局）、拼写lenght/socres、标签与代码不一致 | 30min | 4个改动任务全过（reduce总和+挑战求最大值） |
| 2026.10.22 20:43 | 第5课 my-index05（对象与JSON） | 对象创建/读写/遍历（Object.keys）、引用vs值类型、方法、JSON.stringify/parse | 从Python带过来的习惯：忘声明（本课已全部用const/let克服）；JSON相关拼写serialized/parsed错；引用实验对照打印漏了me.age | 30min | 4个改动任务全过（引用实验+JSON往返） |
| 2026.10.23 17:34 | 第6课 my-index06（字符串与ES6常用） | 模板字符串（插值/多行）、解构（数组/对象、别名/默认值、一行交换）、展开（Math.max/合并/浅拷贝） | 解构与展开概念混淆（解构不创建新对象，展开才创建浅拷贝副本）；交换实验第一遍漏写；自创实验比较式有误导 | 20min | 4个改动任务全过（交换实验+reduce对比补齐） |
| 2026.10.23 18:09 | 第7课 my-index07（DOM操作） | 选中元素（getElementById/querySelector/querySelectorAll）、textContent vs innerHTML、style.xxx驼峰命名、createElement/appendChild/prepend、id自动挂window彩蛋 | 任务1第一遍漏打印现有文本和写彩蛋注释；appendChild"换位置"实验理解了元素只有"一个家" | 30min | 4个改动任务全过（含自创appendChild移动实验验证） |
| 2026.10.23 18:56 | 第8课 my-index08（事件） | addEventListener（click/input/keydown）、事件对象e（target/key/preventDefault）、mouseover布局抖动问题、==改=== | bnt拼错getElementById返回null、mouseover+show导致布局下移按钮难点、空格键分支第一遍漏写 | 45min | 4个改动任务全过（含把mouseover挪到clean解决交互冲突） |
| 2026.10.23 19:56 | 第9课 my-index09（异步入门） | setTimeout、Promise三状态（pending/fulfilled/rejected）、.then/.catch、async/await+try/catch改写、fetch两步await（链式+await两种写法都实践） | p2的setTimeout参数错位（3000跑进resolve没生效）、resolve/pending拼写、状态名理解（resolve/reject是函数非状态） | 60min | 4个改动任务全过（fetch两种风格+按钮切换成功/失败） |
| 2026.10.24 | 阶段二-1 待办清单（my-todo-list） | 数据驱动循环（数组→render→事件→改数据）、闭包捕获循环变量、findIndex+splice、filter删选（let重新赋值）、querySelector vs getElementsByClassName、CSS特异性（.add-row button压过.clear-btn）、flex对齐（margin-top破坏stretch） | 一开始对"整合"没思路，对着源码逐行敲；delBtn怎么知道删哪条（闭包）；getElementsByClassName返回集合没有addEventListener；按钮放.add-row里红色被更高特异性压住 | 70min | 4个改动任务全过（splice删除+选型注释、回车添加、未完成统计、filter清空已完成） |
| 2026.10.24 | 阶段二-2 随机点名器（my-random-picker） | Math.random（[0,1)→×长度→floor取整→下标）、守卫子句（先挡空名单再return）、splice直接改原数组、let vs const（重置要重新赋值）、单双标签判断法（能不能包内容） | 空名单提示被覆盖——if只执行自己代码块、不拦后面代码，缺return导致names[0]=undefined又覆盖提示；==习惯性写成== | 40min | 4个改动任务全过（空名单守卫+return、加人、抽完移除splice+注释、重置名单） |
| 2026.10.24 | 阶段二-3 图片轮播（my-carousel） | setInterval循环定时器（vs setTimeout一次）、取模转圈（next用%length、prev加length回绕负索引）、数据驱动多视图渲染（卡片+圆点都随current重画）、动态颜色用inline vs固定样式用class、mouseenter/mouseleave、回调要传参必须包箭头函数 | prev注释第一遍漏写；直接传clearInterval导致砸不中定时器（事件对象被误当参数）；圆点全被涂色（循环里漏if条件）；inline样式残留压过class | 53min | 4个改动任务全过（上一张取模+注释、圆点动态色跳转、悬停暂停恢复、播放暂停按钮） |
| 2026.10.26 | 阶段二-4 简易计算器（my-calculator） | 状态机（current/previous/operator/justDone 四变量转换）、事件委托（#keys一个监听+dataset.type分流）、字符串拼数（最后Number一次转）、keydown键盘映射（e.key、字符翻译 *→× /→÷、preventDefault） | 状态机比列表渲染抽象，隔两天才消化；Infinity对用户无意义需友好提示；键盘*和程序×不是同一字符要翻译映射 | 45min | 4个改动任务全过（除零保护、小数点includes守卫、退格slice(0,-1)、document keydown键盘映射） |
| 2026.10.27 | 阶段三-1 记账本（my-ledger） | localStorage三件套（setItem/getItem/removeItem，只能存字符串→JSON.stringify）、load→改→save→render循环、数据源vs视图分离（filter挑着画不改records）、事件委托删动态元素（data-index）、reduce合计并入render自动同步 | getElementById找动态按钮返回null（要用事件委托+closest）；Number(对象)=NaN要Number(r.amount)；reduce累加器/当前元素顺序写反且漏初始值0；数字没有.value；select标签≠事件名要用change；map把对象映射成布尔值毁数据要用filter | 80min | 4个改动任务全过（事件委托删除、reduce合计、类别筛选filter、清空removeItem；代改：合计并入render随增删同步） |
| 2026.10.28 | 阶段三-2 天气查询页（my-weather） | fetch两步串联（地理编码拿经纬度→拿天气）、encodeURIComponent中文编码、try/catch兜三类错误（网络/HTTP/业务throw）、finally恢复按钮、抽函数复用（按钮+回车共用fetchWeather）、API返回数字编码前端映射中文（CODE_MAP） | e.target和e.key搞混（target是元素，key才是按键）；fetchWeather函数不存在要先抽函数；style.display="disabled"非法值（disabled是按钮属性不是CSS） | 40min | 4个改动任务全过（城市不存在throw红卡片、湿度字段、回车查询抽函数复用、disabled加载状态finally恢复） |
| 2026.10.29 | 阶段四-上 chat-stream-lite（my-chat-stream） | 消息数组数据驱动渲染（{role,text}对象）、气泡按role分class（user右/ai左）、抽send()函数按钮+回车复用、随机AI回复（数组+Math.random+floor）、空消息守卫trim、发送后focus聚焦输入框 | 无卡点（零件全熟，20min一气呵成） | 20min | 4个改动任务全过（Enter发送抽函数、随机回复数组、空消息守卫、清空+focus） |
| 2026.10.29 | 阶段四-下 chat-stream增强（my-chat-stream续） | localStorage存聊天历史（load/save循环）、自动滚动（scrollTop=scrollHeight）、正在输入占位气泡（pop替换真回复）、清空对话（removeItem）、模拟流式打字（setInterval逐字slice截取+局部更新textContent） | innerHTML空白文本节点导致lastChild取到文本节点而非气泡div（要用lastElementChild）；流式期间不重建整个列表只改最后气泡textContent | 15min | 4个增强任务全过（localStorage历史、自动滚动、正在输入状态、清空对话；加练：setInterval流式打字效果） |
| 2026.10.30 | 阶段五 TS速成（my-ts-intro） | TS=JS+类型标注（变量/函数/接口/联合类型/可选字段）、interface≈Java class、编译时类型检查、联合类型vs方法重载（重载=同名函数不同参数；联合=一个位置可接受多类型） | 浏览器实时编译方案体验差（VS Code红波浪线不影响运行）；phone误写成数字（接口标注string要类型对齐） | 40min | 4个改动任务全过（Todo接口数组、calculate函数类型、formatId联合类型、User可选phone字段） |
| 2026.11.02 | 阶段六第1课 JSX与组件（my-react-intro） | 组件=返回JSX的函数（大写开头）、JSX三坑（class→className/{}插值/事件驼峰）、props传参≈函数参数、列表渲染map+key、三元条件渲染、React声明式（render/DOM操作被框架封装） | appendChild(字符串)报错（组件里禁止手动DOM操作，只写JSX）；Welcom拼错ReferenceError；done="true"引号传字符串非布尔（truthy陷阱，"False"也触发删除线） | 30min | 4个改动任务全过（Footer组件、city props、skills列表map+key、TodoItem三元条件渲染） |
| 2026.11.02 | 阶段六第2课 props与组件通信（my-props-communication） | children=标签中间内容（套娃）、解构{name}少写props前缀、默认值{name="游客"}、单向数据流（数据在父、子只读props） | children误用传数据数组（应传普通prop如items）；解构注释误写"报错"（JS解构缺失字段是undefined，报错是TS类型检查的活）；TodoList思考题：子组件不能改props，需父用state+回调（第3课） | 30min | 4个改动任务全过（Panel children、Greeting默认值、UserCard解构、TodoList单向数据流items） |
| 2026.11.03 | 阶段六第3课 state与事件处理（react-app工程：MyCounter + TodoApp） | useState（[值,改值函数]）、setCount触发重渲染（count++不行）、onClick收函数不收调用、单向数据流闭环（父管state传回调、子调onAdd上报）、不可变更新[...todos,text]、filter按索引删除（map第2参数） | 工程模式双击index.html打不开（必须npm run dev）；const TodoApp()语法错误；大写String应为小写string；JSX里裸写>t<是字面量要包{}；TodoApp首次两个state协作觉得复杂（规律：谁拥有数据谁持state，别人想改走回调） | 50min | 4个改动任务全过（体验useState/重置按钮+注释/TodoApp添加onAdd回调/删除filter不可变更新） |
| 2026.11.05 | 阶段六第4课 条件渲染与列表渲染（MyListDemo） | &&短路=JSX里不能写if语句所以用表达式（false时整块消失）、三元二选一、map+key（key必须放在map返回的最外层元素）、filter派生数据（返回新数组不动原数组，新引用触发重渲染）、按id删除vs按索引（删除中间行索引错位id不会）、{...todo,done:true}展开更新、Math.max(0,...ids)+1生成自增id | filter注释误写"返回原数组"（概念反了，新数组才触发重渲染）；key放在li但map返回div包li导致警告（key要放最外层）；注释写半截没删；自由发挥把删除/完成合并进一个按钮（done?删除:完成） | 60min | 4个改动任务全过（空状态短路/清除已完成filter/按id删除/key实验+位置修正）+自由发挥添加功能 |
| 2026.11.06 | 阶段六第5课 表单与受控组件（MyFormDemo） | 受控组件=state管值（value负责显示onChange写回，单一数据源）、React表单三注意（textarea用value不写内容/select的value在select上不在option/checkbox用checked不用value）、onSubmit必须preventDefault防刷新、多字段一个对象state+{...form,[e.target.name]:value}统一onChange（计算属性名一处顶三处）、字数派生不单独存state、disabled由state派生（!agreed||length>50） | 三元素忘写name→e.target.name为undefined导致受控输入框打不进字（死锁）；checkbox用handleChange读value勾不上（应读checked）；submitted存了快照但没渲染→build报TS6133；空onClick调试残留 | 60min | 4个改动任务全过（条款门槛disabled/字数限制派生/深圳选项/统一onChange+e.target.name） |
| 2026.11.10 | 阶段六第6课 useEffect与副作用（MyEffectDemo） | 副作用=渲染之外影响外部世界的事（请求/定时器/localStorage/订阅）；useEffect三种依赖形态（[]=挂载只跑一次、[dep]=dep变化就重跑、不写=每次渲染都跑）；return清理函数（下次执行前/卸载时调用，清interval防泄漏）；依赖数组=effect的触发条件清单，[]里没有值可比所以永不因变化重跑；StrictMode开发模式故意跑两次检验清理函数 | 想通[]为何永不重跑（空清单没有可变的值，而[running]能被外部改）；不写clearInterval旧定时器会一直跑；第二条日志文案复制错（写成挂载effect实为变化effect）；自由发挥加floorFixed做0.1秒精度 | 40min | 4个改动任务全过（暂停验证+注释/依赖实验[]与[running]对比/刷新持久化读写分工/控制台对照两组日志次数） |
| 2026.11.11 | 阶段六第8课 组件化实战：重构记账本（MyLedgerDemo） | 组件拆分三问（按职责拆/谁拥有数据谁持state/子组件靠props回调上报）、Omit<LedgerRecord,"id">造"不带id的记录类型"、useState惰性初始化（传函数只首次执行，省掉空数组再effect回填）、effect作持久化唯一出口（records变就写回）、派生数据不存state（visible/total渲染时算）、空状态分层（全局空与筛选空两种文案由父组件判断）、清空不需要removeItem | 任务4用visible.length===records.length判断"是否筛选"：逻辑本身不产生错误（长度相等即同一集合，两分支同值），但恒等价于visible.reduce，误以为已改成"全部口径"，截图验证全部32132/餐饮1后才想清；input type="string"非法（应为text）；100min里主要难点在组件拆分与state归属判断 | 100min | 任务1四组件拆分✅（反向state上提实验未做）、任务2清空✅、任务3空状态分层✅、任务4主动选可见口径（合计随筛选变，注释按计划暂缓） |

## 阶段进度

- [x] **阶段0 · HTML/CSS 回顾**：`00-htmlcss-refresh/index.html`
- [x] **阶段一 · JS 语法**（每个点配 demo，做完勾选）：
  - [x] 变量与数据类型（let/const、string/number/boolean、类型转换）
  - [x] 运算符与流程控制（if/switch、for/while）
  - [x] 函数与作用域（声明式/箭头函数、返回值、作用域）
  - [x] 数组与常用方法（push/map/filter/find/reduce）
  - [x] 对象与 JSON
  - [x] 字符串与 ES6 常用（模板字符串、解构、展开）
  - [x] DOM 操作（选中元素、改内容/样式、创建元素）
  - [x] 事件（click/input/keydown、事件对象）
  - [x] 异步入门（setTimeout、Promise、async/await、fetch）
- [x] **阶段二 · 语法整合 demo**：
  - [x] 待办清单（数据驱动循环：数组→render→事件→改数据）
  - [x] 随机点名器（Math.random、守卫子句）
  - [x] 图片轮播（setInterval、取模转圈、圆点指示器）
  - [x] 简易计算器
- [x] **阶段三 · 小项目**：
  - [x] 记账本（localStorage 持久化）
  - [x] 天气查询页（fetch 真实 API）
- [x] **阶段四 · 复现项目**：chat-stream-lite
- [x] **阶段五 · TS 速成**：类型标注/interface/联合类型/可选字段
- [ ] **阶段六 · 框架**：React（进行中：第1~6课 ✅ / 第7课工程化已提前落地 ✅ / 第8课组件化实战 ← 下一课）
