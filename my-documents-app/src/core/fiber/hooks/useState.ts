import { useForceRender } from '.'

export function useState<T>(ref: any, key: string, initialValue: T): [T, (newValue: T) => void] {
  const forceRender = useForceRender(ref) // 🔄 Vincular con `forceRender`

  // ✅ Si la clave no existe, la inicializa con el valor por defecto
  if (!(key in ref.state)) {
    ref.state[key] = initialValue
  }

  // ✅ Función para actualizar el estado y disparar el re-render
  const setState = (newValue: T) => {
    ref.state[key] = newValue
    forceRender()
  }

  return [ref.state[key], setState]
}
