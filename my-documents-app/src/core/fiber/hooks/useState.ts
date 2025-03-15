import { useForceRender } from '.'

export function useState<T>(ref: any, key: string, initialValue: T): [T, (newValue: T) => void] {
  const forceRender = useForceRender(ref) // 🔄 Vincular con `forceRender`

  // ✅ Usamos el __fid para garantizar el estado único por componente
  const stateKey = `${ref.__fid}_${key}`

  // ✅ Si la clave no existe, la inicializa con el valor por defecto
  if (!(stateKey in ref.state)) {
    ref.state[stateKey] = initialValue
  }

  // ✅ Función para actualizar el estado y disparar el re-render
  const setState = (newValue: T) => {
    ref.state[stateKey] = newValue
    forceRender()
  }

  return [ref.state[stateKey], setState]
}
