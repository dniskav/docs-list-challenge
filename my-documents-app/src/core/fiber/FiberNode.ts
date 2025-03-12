/**
 * Represents a node in the Fiber tree.
 */
export type FiberNode = {
  type: string | Function
  props: Record<string, any>
  parent?: FiberNode | null
  child?: FiberNode | null
  sibling?: FiberNode | null
  dom?: HTMLElement | Text | null
  alternate?: FiberNode | null
}

/**
 * Creates a new FiberNode.
 *
 * @param type - The type of the node, which can be an HTML tag or a function component.
 * @param props - The properties associated with the node.
 * @returns A new FiberNode with an empty DOM reference.
 */
export function createFiberNode(type: string | Function, props: Record<string, any>): FiberNode {
  return { type, props, dom: null }
}
