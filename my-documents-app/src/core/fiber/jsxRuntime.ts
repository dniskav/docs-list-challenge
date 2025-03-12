import { createFiberNode, FiberNode } from './FiberNode'

/**
 * Creates a FiberNode representation of an element, similar to React's `createElement` function.
 * This function supports both functional and string-based component types.
 *
 * @param type - The type of the element (either an HTML tag as a string or a functional component).
 * @param props - An object containing the properties of the element.
 * @param children - The child elements of the node.
 * @returns A new FiberNode representing the given element.
 */
export function h(
  type: string | Function,
  props: Record<string, any> = {},
  ...children: any[]
): FiberNode {
  if (typeof type === 'object' && type !== null) {
    return type as FiberNode
  }

  const fiberNode = createFiberNode(type, {
    ...props,
    children: children
      .flat()
      .map((child) =>
        typeof child === 'string' ? createFiberNode('TEXT_ELEMENT', { nodeValue: child }) : child
      )
  })

  return fiberNode
}
