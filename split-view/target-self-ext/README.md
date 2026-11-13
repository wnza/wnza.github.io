# 原地打开 · 分屏伴侣（Chrome 扩展）

`split-view/index.html` 里的 iframe 是别人的网站，链接写着 `target="_blank"`，父页面受同源策略限制改不了——点视频就会蹦出新标签。这个扩展反过来从"里面"改：把 `target="_blank"` 改成 `_self`，点了就在同一屏里跳，并把新地址回报给上层的地址框。

## 安装（一次性，1 分钟）

1. 打开 Chrome，地址栏输入 `chrome://extensions/`
2. 右上角打开 **开发者模式**
3. 点 **加载已解压的扩展程序**，选这个 `split-view\target-self-ext` 文件夹
4. 列出现「原地打开 · 分屏伴侣」就行了，不用配置

装完刷新 `split-view/index.html`，再点虎牙 / 抖音的卡片，就会在那一屏里打开，地址框也跟着变。

## 覆盖哪些站

虎牙、抖音（含 live.douyin.com）、B站、知乎、小红书、微博。

想加别的站，在 `manifest.json` 的 `host_permissions` 和两个 `content_scripts.matches` 里加一条 `*://*.example.com/*`，然后回 `chrome://extensions/` 点一下这个扩展的「重新加载」。

## 它做了三件事

- `content.js`：把页面上 `target="_blank"` 的链接改成 `_self`，包括 JS 后面渲染出来的（盯着 DOM 变化），鼠标按下时再纠一次。
- `content.js`：在 iframe 里时，把当前地址 `postMessage` 给上层分屏页（`{__splitView:true, type:'location', href, title}`），分屏页据此**同步自己那条地址框**——跨域 iframe 里父页面读不到 `location.href`，只能靠这一步。
- `main.js`：页面用 `window.open(...)` 打开**同源**链接时，改成当前页跳转；跨站的分享/登录弹窗不受影响。

## 在不装它的页面上会怎样

- 点击目标站里的视频/直播间 → 照旧弹新标签（站点写死 `target="_blank"`，页面侧无解）
- 分屏页的地址框不会变（读不到 iframe 的真实地址）

## 不想要了

`chrome://extensions/` 里关掉或移除即可，分屏页本身不受影响（只是又会开始弹新标签）。
