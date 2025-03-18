import { getHookIndex, getHooksContext, incHookIndex } from './hooksContext'

type EffectHook = {
  effect: () => void | (() => void)
  deps: any[]
  cleanup?: () => void
}

export function useEffect(effect: () => void | (() => void), deps?: any[]) {
  const { currentFid, hooksContext } = getHooksContext()
  if (!currentFid) return

  const self = hooksContext[currentFid]
  if (!self) return

  if (!self.effects) {
    self.effects = [] as EffectHook[]
  }

  const idx = getHookIndex()
  const prevEffect = self.effects[idx] || null
  const hasChanged = !prevEffect || !deps || deps.some((dep, i) => dep !== prevEffect.deps?.[i])

  if (hasChanged) {
    prevEffect?.cleanup?.() // Ejecuta cleanup si existe
    const cleanup = effect() as (() => void) | undefined
    self.effects![idx] = { effect, deps: deps || [], cleanup }
  }

  incHookIndex()
}
