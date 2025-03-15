import { h } from '..' // Asegurar acceso a h()

export function useSelfRef<T = any>(fid: string): T {
  const config = h.getConfig()
  if (!config.useFTree) {
    throw new Error('❌ El fTree no está habilitado.')
  }

  const fTree = config.fTree
  if (!fTree) {
    throw new Error('❌ No se encontró el fTree en la configuración.')
  }

  const ref = fTree[fid]
  if (!ref) {
    throw new Error(
      `❌ No se encontró la referencia en el fTree para el componente con __fid: ${fid}`
    )
  }

  return ref as T
}
