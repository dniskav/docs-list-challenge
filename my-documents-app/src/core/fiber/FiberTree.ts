import { FiberNode } from './FiberNode'

let rootFiber: FiberNode | null = null

export function reconcile(newFiber: FiberNode) {
  rootFiber = newFiber
}

export function getRoot() {
  return rootFiber
}
