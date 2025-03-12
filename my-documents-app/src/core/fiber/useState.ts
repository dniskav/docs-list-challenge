export function useState<T>(
  initialValue: T
): [() => T, (newValue: T) => void, (callback: () => void) => () => void] {
  let state: T = initialValue
  const listeners: Set<() => void> = new Set()

  function setState(newValue: T): void {
    if (state !== newValue) {
      state = newValue
      listeners.forEach((listener) => listener())
    }
  }

  function subscribe(callback: () => void): () => void {
    listeners.add(callback)
    return () => listeners.delete(callback)
  }

  return [() => state, setState, subscribe]
}
