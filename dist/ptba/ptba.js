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
  const cookieRegex = /https:\/\/1ptba.com\/index.php/;
  const store = useStore();
  const is = useIs();
  if (is.isRequest && cookieRegex.test($request.url)) {
    $notify("DEBUG", "1ptba", JSON.stringify($request.headers));
    const cookie = $request == null ? void 0 : $request.headers.Cookie;
    if ($request.method === "GET" && cookie !== void 0) {
      store.write("1ptba_cookie", cookie);
      $notify("cookie更新成功", "1ptba", `更新为 ${cookie}`);
    }
  }
})();
