import { expect, test } from 'vitest'

test('hifini regex', () => {
  let url = 'https://hifini.com/plugin/plugin/jan/css/bootstrap-v2.css?1.0'
  const regex = /^https:\/\/hifini.com\/$/
  expect(regex.test(url)).toBeFalsy()

  url = 'https://hifini.com'
  expect(regex.test(url)).toBeFalsy()

  url = 'https://hifini.com/'
  expect(regex.test(url)).toBeTruthy()
})
