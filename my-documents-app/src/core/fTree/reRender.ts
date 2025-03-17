import { fTree } from './fTree'
import { setCurrentFid } from './hooks/hooksContext'
import { generateFID } from './jsxRuntime'
import { render } from './render'

export function reRenderComponent(fid: string) {
  const compNode = fTree[fid]
  const oldhostFid = compNode.hostFid
  if (!compNode || !oldhostFid) return
  const oldDom = fTree[oldhostFid]?.domRef
  if (!compNode || !oldDom) return
  if (typeof compNode.type !== 'function') return

  const activeElement = document.activeElement as HTMLElement
  const isFocused = oldDom.contains(activeElement)
  const cursorPos = (activeElement as HTMLInputElement)?.selectionStart || 0

  setCurrentFid(fid)
  const subVNode = compNode.type(compNode.props)
  setCurrentFid(null)

  if (!subVNode.__fid) {
    subVNode.__fid = compNode.hostFid || generateFID()
  }
  compNode.hostFid = subVNode.__fid
  fTree[oldhostFid] = { ...fTree[oldhostFid], domRef: oldDom }

  const hostNodeData = fTree[oldhostFid]
  if (!hostNodeData?.domRef) return

  const parent = hostNodeData.domRef.parentNode
  if (!parent) return

  const newDom = render(subVNode, undefined)
  if (newDom) {
    parent.replaceChild(newDom, oldDom)
    hostNodeData.domRef = newDom as HTMLElement
    if (oldhostFid) {
      delete fTree[oldhostFid]
    }

    if (isFocused && newDom instanceof HTMLElement) {
      const input = newDom.querySelector<HTMLInputElement>('input')
      input?.focus()
      input?.setSelectionRange(cursorPos, cursorPos)
    }
  }
}
