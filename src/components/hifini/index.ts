import { useIs, useStore } from '@/composables'

const store = useStore()
const is = useIs()

const prefKey = 'hifini_cookie'
const cookieRegex = /^https:\/\/hifini.com$/

if (is.isRequest && cookieRegex.test($request!.url)) {
  const cookie = $request?.headers.cookie
  if ($request.method === 'GET') {
    if (cookie !== undefined) {
      store.write(prefKey, cookie)
      $notify('cookie更新成功', 'hifini', `更新为 ${cookie}`)
    }
  }
  $done()
}
else {
  printRequestUrl()
}

function printRequestUrl(): void {
  $notify('hifini', 'url', $request!.url)
}

function checkin(): void {
  $task.fetch({
    url: 'https://www.hifini.com/sg_sign.htm',
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
      'Cookie': store.read(prefKey),
    },
  }).then((response: QuanXResponse) => {
    if (response.statusCode === 200)
      $notify('签到成功', 'hifini', '自动化已完成')
  }).finally(() => {
    $done()
  })
}
