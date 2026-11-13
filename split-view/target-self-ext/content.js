/* 把页面上 target="_blank" 的链接改成在原地打开。
   跑在隔离世界，只动 DOM 属性，不碰页面的 JS。 */
(function () {
  'use strict';

  var SELECTOR = 'a[target="_blank"], a[target=_blank], form[target="_blank"]';

  function patch(root) {
    if (!root || !root.querySelectorAll) return 0;
    var list = root.querySelectorAll(SELECTOR);
    for (var i = 0; i < list.length; i++) list[i].target = '_self';
    return list.length;
  }

  patch(document);

  /* 虎牙、抖音的卡片是 JS 渲染的，后面才插进来，所以盯着 DOM */
  var observer = new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var added = records[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        var node = added[j];
        if (!node || node.nodeType !== 1) continue;
        if (node.matches && node.matches(SELECTOR)) node.target = '_self';
        patch(node);
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  /* 有些站点会动态改回来，鼠标按下时再纠一次 */
  document.addEventListener('mousedown', function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest('a[target="_blank"]') : null;
    if (el) el.target = '_self';
  }, true);

  /* ---------- 把当前地址回报给上层分屏页 ----------
     跨域 iframe 里父页面读不到 location.href，只能由这里 postMessage 出去，
     分屏页收到后同步自己那一条地址栏。 */
  if (window.top !== window) {
    var lastHref = '';

    function report() {
      var href = location.href;
      if (href === lastHref) return;
      lastHref = href;
      try {
        window.top.postMessage({
          __splitView: true,
          type: 'location',
          href: href,
          title: document.title || ''
        }, '*');
      } catch (e) {
        /* 跨域被拦就算了，不影响跳转本身 */
      }
    }

    report();
    window.addEventListener('popstate', report);
    window.addEventListener('hashchange', report);
    document.addEventListener('DOMContentLoaded', report);
    setInterval(report, 700);
  }
})();
