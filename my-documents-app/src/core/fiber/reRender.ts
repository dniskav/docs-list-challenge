// reRender.ts (Optimizado para no eliminar el DOM por completo)
import { fTree } from './fTree'
import { setCurrentFid } from './hooks/hooksContext'
import { render } from './render'

export function reRenderComponent(fid: string) {
  const compNode = fTree[fid]
  const oldhostFid = compNode.hostFid
  const oldDom = fTree[compNode.hostFid]?.domRef
  if (!compNode || !oldDom) return
  if (typeof compNode.type !== 'function') return

  console.log(`\nRe-rendering component fid=${fid}`)

  // 📌 Guardar el nodo enfocado antes del reemplazo
  const activeElement = document.activeElement as HTMLElement
  const isFocused = oldDom.contains(activeElement)
  const cursorPos = (activeElement as HTMLInputElement)?.selectionStart || 0

  // **Establecer el componente actual** (para que useState use el mismo fid)
  setCurrentFid(fid)
  const subVNode = compNode.type(compNode.props)
  setCurrentFid(null)

  // 🔥 Asegurar que `hostFid` siempre se actualiza correctamente
  if (!subVNode.__fid) {
    subVNode.__fid = compNode.hostFid || 'fid_subrender_' + Math.random()
  }
  compNode.hostFid = subVNode.__fid
  fTree[compNode.hostFid] = { ...fTree[compNode.hostFid], domRef: oldDom }

  // Obtener nodo DOM actual
  const hostNodeData = fTree[compNode.hostFid]
  if (!hostNodeData?.domRef) return

  const parent = hostNodeData.domRef.parentNode
  if (!parent) return

  // 🚀 Reemplazar solo los cambios sin perder el foco
  const newDom = render(subVNode, null)
  if (newDom) {
    parent.replaceChild(newDom, oldDom)
    hostNodeData.domRef = newDom
    delete fTree[oldhostFid]

    // 📌 Restaurar el foco después del reemplazo
    if (isFocused) {
      const input = newDom.querySelector('input') as HTMLInputElement
      if (input) {
        input.focus()
        input.setSelectionRange(cursorPos, cursorPos) // Mantener posición del cursor
      }
    }
  }
}
