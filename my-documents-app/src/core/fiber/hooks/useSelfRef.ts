import { h } from '..' // Asegurar acceso a h()

export function useSelfRef<T = any>(fid: string): T {
  const config = h.getConfig()
  if (!config.useStore) {
    throw new Error('❌ El store no está habilitado.')
  }

  const store = config.store
  if (!store) {
    throw new Error('❌ No se encontró el store en la configuración.')
  }

  const ref = store[fid]
  if (!ref) {
    throw new Error(
      `❌ No se encontró la referencia en el store para el componente con __fid: ${fid}`
    )
  }

  return ref as T
}
