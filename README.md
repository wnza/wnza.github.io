# 简页 · 极简导航

一个极简的个人导航页。左侧分类、顶部搜索、卡片式站点列表，没有多余装饰。

![界面预览](preview.png)

![深色主题](preview-dark.png)

## 特性

- 左侧分类锚点导航，滚动自动高亮
- 顶部实时搜索：按名称、描述、分类、网址筛选
- 搜索空状态、随机打开一个站点
- 明暗主题切换，自动记住选择
- 键盘 `/` 聚焦搜索，`Esc` 清空
- 桌面四列 / 平板三列 / 手机单列
- 纯单文件，无 npm 依赖，无外部图片和字体请求

## 直接使用

双击 `index.html` 即可。

## 修改站点

打开 `index.html`，在底部脚本里找到 `SITES`：

```js
{ cat: '常用', name: 'GitHub', desc: '代码托管与开源项目', url: 'https://github.com/', mark: 'G' }
```

- `cat`：分类名，需要和 `CATEGORIES` 里的分类对应
- `name`：站点名称
- `desc`：一句话描述
- `url`：点击后打开的地址
- `mark`：卡片左侧的字母 / 汉字标记
- `badge`：可选，例如 `本站`

分类顺序在 `CATEGORIES` 中调整：

```js
{ name: '设计', icon: 'pen', slug: 'design' }
```

`icon` 可用：`home`、`code`、`pen`、`book`、`tool`、`play`。
`slug` 用于生成分类锚点，例如 `#cat-design`。

## 部署到 GitHub Pages

页面是纯静态单文件，放到任意静态目录即可，例如：

- `https://wnza.github.io/vue_study/`
- `https://wnza.github.io/vue_study/minimal-nav/`

里面默认放的是正规常用站点；如果你要换成自己的收藏，直接修改 `SITES` 后重新上传即可。

## 说明

示例站点仅用于展示导航结构，不代表推荐或背书。页面不收集访问数据，主题偏好只保存在浏览器本地。
