# test123

这是一个包含两个独立入口的示例项目：

- `blog/`：使用 HTML、CSS 和原生 JavaScript 编写的静态博客。
- `algorithms/`：使用 Node.js CommonJS 编写的排序算法示例。

## 环境要求

- Node.js >= 18
- Python 3（仅用于本地预览博客）

## 排序算法

运行命令行示例：

```bash
node algorithms/sorting.js
```

运行完整测试：

```bash
npm test
```

排序函数的输入契约如下：

- 输入必须是数组；
- 未提供比较器时，只接受有限数字；
- 字符串、对象等非数字数据必须显式传入自定义比较器；
- 自定义比较器必须返回有限数字；
- `bubbleSort`、`insertionSort` 和 `quickSort` 都返回新数组，不修改输入数组；
- 冒泡排序和插入排序稳定，快速排序不保证稳定。

更详细的算法说明见 [`algorithms/README.md`](algorithms/README.md)。

## 博客预览

博客与排序模块没有浏览器运行时集成。`algorithms/sorting.js` 是 Node.js CommonJS 模块，不能直接通过浏览器的经典 `<script>` 标签加载；博客仍作为独立静态站点运行。

在仓库根目录启动本地服务器：

```bash
python3 -m http.server 8000 --directory blog
```

然后访问 <http://localhost:8000>。

## 目录结构

```text
.
├── algorithms/          # Node.js 排序示例、测试和说明
├── blog/                # 静态博客
├── package.json         # 根级测试脚本和 Node 版本约束
└── .github/workflows/   # GitHub Actions CI
```

每次 push 和 Pull Request 都会由 GitHub Actions 在 Node.js 18、20 和 22 上运行 `npm test`。
