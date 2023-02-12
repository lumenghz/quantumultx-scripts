import { useIs, useStore } from '@/composables'

const store = useStore()
const is = useIs()

const prefKey = 'hifini_cookie'
const cookieRegex = /^https:\/\/hifini.com\/$/

if (is.isRequest && cookieRegex.test($request!.url) === true) {
  const cookie = $request?.headers.Cookie
  if ($request.method === 'GET' && cookie !== undefined) {
    store.write(prefKey, cookie)
    $notify('cookie更新成功', 'hifini', `更新为 ${cookie}`)
  }
  $done()
}
else {
  checkin()
}

function checkin(): void {
  const cookie = store.read(prefKey)
  $task.fetch({
    url: 'https://hifini.com/sg_sign.htm',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Mobile/15E148 Safari/604.1',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cookie': cookie,
      'Connection': 'keep-alive',
    },
  }).then((response: QuanXResponse) => {
    if (response.statusCode === 200)
      $notify('签到成功', 'hifini', '自动化已完成')
  }).finally(() => {
    $done()
  })
}
