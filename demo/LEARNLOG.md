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
- [ ] **阶段二 · 语法整合 demo**：
  - [x] 待办清单（数据驱动循环：数组→render→事件→改数据）
  - [x] 随机点名器（Math.random、守卫子句）
  - [x] 图片轮播（setInterval、取模转圈、圆点指示器）
  - [ ] 简易计算器
- [ ] **阶段三 · 小项目**：记账本（localStorage）/ 天气查询页（fetch）
- [ ] **阶段四 · 复现项目**：chat-stream-lite
