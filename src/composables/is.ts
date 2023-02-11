const isQX = typeof $task !== 'undefined'
const isRequest = typeof $request !== 'undefined'
const isNode = typeof require == 'function'

export function useIs() {
  return {
    isQX,
    isRequest,
    isNode,
  }
}
