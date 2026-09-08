# 林野的技术手记

一个只使用 HTML5、CSS 和原生 JavaScript 的个人技术博客首页。没有构建工具、框架或第三方运行时依赖，适合直接部署到 GitHub Pages、Netlify 或任意静态文件服务器。

## 本地预览

直接双击 `index.html` 即可打开；也可以在项目目录启动一个静态服务器：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。

## 文件说明

- `index.html`：语义化页面结构和示例文章内容
- `style.css`：响应式布局、深色/浅色主题和组件样式
- `script.js`：主题切换、文章搜索、分类筛选、移动端菜单与静态表单反馈
- `favicon.svg`：零依赖的站点图标

## 自定义内容

1. 在 `index.html` 中替换个人介绍、邮箱和社交链接。
2. 复制 `.article-card` 并更新 `data-category`、`data-search`、标题、摘要和日期来添加文章。
3. 如果需要真正的订阅功能，将 `#newsletter-form` 接入表单服务或自己的后端。

页面默认使用深色主题，点击右上角圆形按钮可以切换主题；主题选择会保存在浏览器的 `localStorage` 中。
