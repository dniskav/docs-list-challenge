import { createEl } from '../'
import { h } from '../' // Importar función para crear elementos JSX

export function useForceRender(ref: any) {
  return () => {
    if (!ref || !ref.component) {
      console.error('⚠️ No se puede renderizar, ref no válida:', ref)
      return
    }

    // 🔥 Generar nuevas props fusionando estado actual sin mutar el original
    const updatedProps = { ...ref.props, ...ref.state }

    // 🔄 Generar nuevo JSX con las props fusionadas
    const newJSX = ref.component(updatedProps)

    // ✅ Validar si hay `domRef` antes de reemplazar
    if (!ref.domRef) {
      console.warn('⚠️ No se puede reemplazar porque domRef es undefined:', ref)
      return
    }

    const newDom = createEl(newJSX, h.getConfig().store) // 🔥 Convertir JSX a DOM

    console.log(`🔄 Reemplazando en el DOM`, ref.domRef, '➡️', newDom)
    ref.domRef.replaceWith(newDom) // ✅ Reemplazar en el DOM
    ref.domRef = newDom // 📌 Actualizar referencia en el store

    console.log({ myStore: h.getConfig().store })
  }
}
