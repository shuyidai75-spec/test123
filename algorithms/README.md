# 排序算法示例

本目录使用原生 Node.js 实现三种常见排序算法，所有排序函数都会返回一个新数组，不会修改传入的数组。

## 算法

| 函数 | 算法 | 平均时间复杂度 | 最坏时间复杂度 | 是否稳定 |
| --- | --- | ---: | ---: | --- |
| `bubbleSort` | 冒泡排序 | O(n²) | O(n²) | 是 |
| `insertionSort` | 插入排序 | O(n²) | O(n²) | 是 |
| `quickSort` | 快速排序 | O(n log n) | O(n²) | 否 |

默认比较器用于数字升序排序。也可以传入一个比较器，以支持字符串或对象等数据：

```js
const { bubbleSort, insertionSort, quickSort } = require('./sorting');

bubbleSort([5, 2, 9]);
// [2, 5, 9]

const posts = [
  { title: 'C', views: 20 },
  { title: 'A', views: 50 },
];

quickSort(posts, (first, second) => first.views - second.views);
// [{ title: 'C', views: 20 }, { title: 'A', views: 50 }]
```

## 运行

在仓库根目录执行：

```bash
node algorithms/sorting.js
node --test algorithms/sorting.test.js
```

`quickSort` 使用三路分区处理重复值，并使用显式范围栈，避免依赖递归调用栈。由于函数保持输入不变，三个函数都会先复制输入数组；表格中的空间复杂度不包含这份返回数组。
