import { fTree } from '../fTree'

let currentFidStack: (string | null)[] = []
let hookIndex = 0

export function getCurrentFid() {
  return currentFidStack[currentFidStack.length - 1] || null
}

export function setCurrentFid(fid: string | null) {
  if (fid !== null) {
    currentFidStack.push(fid)
  } else {
    currentFidStack.pop()
  }
  hookIndex = 0
}

export function getHookIndex() {
  return hookIndex
}

export function incHookIndex() {
  hookIndex++
}

export function getHooksContext() {
  return {
    currentFid: getCurrentFid(),
    hooksContext: fTree
  }
}
