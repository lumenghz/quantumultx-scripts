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
  const cookieRegex = /^https:\/\/hifini.com$/;
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
    printRequestUrl();
  }
  function printRequestUrl() {
    $notify("hifini", "url", $request.url);
  }
})();
