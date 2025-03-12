export type FiberNode = {
  type: string | Function
  props: Record<string, any>
  parent?: FiberNode | null
  child?: FiberNode | null
  sibling?: FiberNode | null
  dom?: HTMLElement | Text | null
  alternate?: FiberNode | null
}

export function createFiberNode(type: string | Function, props: Record<string, any>): FiberNode {
  return { type, props, dom: null }
}
