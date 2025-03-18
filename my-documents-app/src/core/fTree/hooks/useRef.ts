export function useRef<T>(initialValue: T) {
  return { current: initialValue }
}
