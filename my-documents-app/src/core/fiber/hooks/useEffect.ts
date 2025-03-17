import { getHookIndex, getHooksContext, incHookIndex } from './hooksContext'

export function useEffect(effect: () => void | (() => void), deps?: any[]) {
  const { currentFid, hooksContext } = getHooksContext()
  if (!currentFid) return

  const self = hooksContext[currentFid]
  if (!self) return

  if (!self.effects) {
    self.effects = [] as { effect: Function; deps: any[]; cleanup?: Function }[]
  }

  const idx = getHookIndex()
  const prevEffect = self.effects[idx]
  const hasChanged = !prevEffect || !deps || deps.some((dep, i) => dep !== prevEffect.deps?.[i])

  if (hasChanged) {
    if (prevEffect?.cleanup) {
      prevEffect.cleanup()
    }
    const cleanup = effect() as (() => void) | undefined
    self.effects[idx] = { effect, deps: deps || [], cleanup }
  }

  incHookIndex()
}
