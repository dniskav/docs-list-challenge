import { fTree } from '../fTree'
import { reRenderComponent } from '../reRender'
import { getCurrentFid, getHookIndex, incHookIndex } from './hooksContext'

export function useState<T>(initialValue: T): [T, (newValue: T | ((prevVal: T) => T)) => void] {
  const fid = getCurrentFid()
  if (!fid) {
    throw new Error('useState called outside of a rendering component!')
  }

  let compNode = fTree[fid]

  if (!compNode) {
    fTree[fid] = { fid, type: '', props: {}, state: {}, hooks: [] }
    compNode = fTree[fid]
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

  const setValue = (newVal: T | ((prevVal: T) => T)) => {
    const oldVal = compNode.hooks?.[stateIndex]

    if (oldVal === undefined) return

    const updatedVal = typeof newVal === 'function' ? (newVal as (prevVal: T) => T)(oldVal) : newVal

    const isSame =
      Array.isArray(oldVal) && Array.isArray(updatedVal)
        ? oldVal.length === updatedVal.length && oldVal.every((v, i) => v === updatedVal[i])
        : Object.is(oldVal, updatedVal)

    if (!isSame) {
      compNode.hooks![stateIndex] = updatedVal
      reRenderComponent(fid)
    }
  }

  incHookIndex()
  return [value, setValue]
}
