import { useIs } from './is'

export function useStore() {
  const is = useIs()

  return {
    read(key: string): string | null {
      if (is.isQX)
        return $prefs.valueForKey(key)
      return null
    },
    write(key: string, value: string) {
      if (is.isQX)
        $prefs.setValueForKey(value, key)
    },
  }
}
