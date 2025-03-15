import { createEl } from '../'
import { h } from '../' // Importar función para crear elementos JSX

export function useForceRender(ref: any) {
  return () => {
    if (!ref || !ref.component) {
      console.error('⚠️ No se puede renderizar, ref no válida:', ref)
      return
    }

    // 📌 Guardar el nodo enfocado antes del reemplazo
    const activeElement = document.activeElement as HTMLElement
    const isFocused = ref.domRef.contains(activeElement)
    const cursorPos = (activeElement as HTMLInputElement)?.selectionStart || 0

    ref.props = { ...ref.props, ...ref.state } // ✅ Actualizar props

    const newJSX = ref.component(ref.props) // 🔄 Generar nuevo JSX con props actuales
    const newDom = createEl(newJSX, h.getConfig().store) // 🔥 Convertir JSX a DOM

    console.log(`🔄 Reemplazando en el DOM`)
    ref.domRef.replaceWith(newDom) // ✅ Reemplazar en el DOM
    ref.domRef = newDom // 📌 Actualizar referencia en el store

    // 📌 Restaurar el foco después del reemplazo
    if (isFocused) {
      const input = newDom.querySelector('input') as HTMLInputElement
      if (input) {
        input.focus()
        input.setSelectionRange(cursorPos, cursorPos) // Mantener la posición del cursor
      }
    }
  }
}
