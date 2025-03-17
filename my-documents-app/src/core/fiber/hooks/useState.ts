// useState.ts (Optimizado para comparación de valores en objetos y arrays)

import { fTree } from '../fTree'
import { reRenderComponent } from '../reRender'
import { getCurrentFid, getHookIndex, incHookIndex } from './hooksContext'

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  const fid = getCurrentFid()
  if (!fid) {
    throw new Error('useState called outside of a rendering component!')
  }

  let compNode = fTree[fid]

  if (!compNode) {
    // 🚀 Si el nodo no existe, buscar un nodo anterior del mismo tipo y reutilizar su estado
    const oldNode = Object.values(fTree).find((n) => n.type === compNode?.type)
    if (oldNode) {
      fTree[fid] = { ...oldNode, fid } // 🔥 Reutiliza el estado anterior
      compNode = fTree[fid]
    } else {
      fTree[fid] = { fid, type: null, props: {}, state: {}, hooks: [] }
      compNode = fTree[fid]
    }
  }

  if (!compNode.hooks) {
    compNode.hooks = []
  }

  const idx = getHookIndex()
  if (compNode.hooks[idx] === undefined) {
    compNode.hooks[idx] = initialValue
  }

  const stateIndex = idx
  const value = compNode.hooks[stateIndex]

  const setValue = (newVal: T) => {
    const oldVal = compNode.hooks![stateIndex]
    const isSame =
      typeof newVal === 'object'
        ? JSON.stringify(oldVal) === JSON.stringify(newVal)
        : oldVal === newVal

    if (!isSame) {
      compNode.hooks![stateIndex] = newVal
      reRenderComponent(fid)
    }
  }

  incHookIndex()
  return [value, setValue]
}
