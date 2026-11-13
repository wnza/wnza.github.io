/* 页面自己用 window.open 打开的站内链接，也改成原地跳（只处理同源 http/https，
   分享、举报这类弹窗不受影响）。必须跑在 MAIN 世界才能改到页面自己的 window.open。 */
(function () {
  'use strict';

  var original = window.open;

  window.open = function (url, name, features) {
    try {
      if (url && typeof url === 'string') {
        var target = new URL(url, location.href);
        var sameOrigin = target.origin === location.origin;
        var isHttp = target.protocol === 'http:' || target.protocol === 'https:';
        if (sameOrigin && isHttp) {
          location.href = target.href;
          return null;
        }
      }
    } catch (e) {
      /* 解析不了就按原样处理 */
    }
    return original.apply(window, arguments);
  };
})();
