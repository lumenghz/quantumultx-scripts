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
  const cookieRegex = /https:\/\/1ptba.com\/takelogin.php/;
  const store = useStore();
  const is = useIs();
  if (is.isRequest && cookieRegex.test($request.url)) {
    const cookie = $request == null ? void 0 : $request.headers.cookie;
    if (cookie !== "undefined") {
      store.write("1ptba_cookie", cookie);
      $notify("cookie更新成功", "1ptba", `更新为 ${cookie}`);
    }
  }
})();
