import { getHooksContext } from './hooksContext'

export function useEffect(effect: () => void | (() => void), deps?: any[]) {
  const { currentFid, hooksContext } = getHooksContext()
  if (!currentFid) return

  const self = hooksContext[currentFid]
  if (!self) return

  if (!self.effects) {
    self.effects = []
  }

  const prevEffect = self.effects[self.hookIndex]
  const hasChanged = !prevEffect || !deps || deps.some((dep, i) => dep !== prevEffect.deps?.[i])

  if (hasChanged) {
    if (prevEffect?.cleanup) {
      prevEffect.cleanup() // 🔥 Ejecuta la limpieza si existe
    }
    const cleanup = effect() // Ejecuta el nuevo efecto
    self.effects[self.hookIndex] = { effect, deps, cleanup }
  }

  self.hookIndex++
}
