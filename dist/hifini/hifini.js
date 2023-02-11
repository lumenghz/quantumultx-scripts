(function() {
  "use strict";
  const isQX = typeof $task !== "undefined";
  const isRequest = typeof $request !== "undefined";
  const isNode = typeof require == "function";
  function useIs() {
    return {
      isQX,
      isRequest,
      isNode
    };
  }
  function useStore() {
    const is2 = useIs();
    return {
      read(key) {
        if (is2.isQX)
          return $prefs.valueForKey(key);
        return null;
      },
      write(key, value) {
        if (is2.isQX)
          $prefs.setValueForKey(value, key);
      }
    };
  }
  const store = useStore();
  const is = useIs();
  const prefKey = "hifini_cookie";
  const cookieRegex = /^https:\/\/hifini.com\/$/;
  if (is.isRequest && cookieRegex.test($request.url)) {
    const cookie = $request == null ? void 0 : $request.headers.cookie;
    if ($request.method === "GET") {
      if (cookie !== void 0) {
        store.write(prefKey, cookie);
        $notify("cookie更新成功", "hifini", `更新为 ${cookie}`);
      }
    }
    $done();
  } else {
    checkin();
  }
  function checkin() {
    $task.fetch({
      url: "https://www.hifini.com/sg_sign.htm",
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        "Cookie": store.read(prefKey)
      }
    }).then((response) => {
      if (response.statusCode === 200)
        $notify("签到成功", "hifini", "自动化已完成");
    }).finally(() => {
      $done();
    });
  }
})();
