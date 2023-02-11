import { useIs, useStore } from '@/composables'

const cookieRegex = /https:\/\/1ptba.com\/index.php/

const store = useStore()
const is = useIs()

if (is.isRequest && cookieRegex.test($request!.url)) {
  $notify('DEBUG', '1ptba', JSON.stringify($request.headers))
  const cookie = $request?.headers.Cookie
  if ($request.method === 'GET' && cookie !== undefined) {
    store.write('1ptba_cookie', cookie)
    $notify('cookie更新成功', '1ptba', `更新为 ${cookie}`)
  }
}
else {
  // checkin
}
