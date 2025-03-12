import { createFiberNode, FiberNode } from './FiberNode'

export function h(
  type: string | Function,
  props: Record<string, any> = {},
  ...children: any[]
): FiberNode {
  if (typeof type === 'object' && type !== null) {
    return type as FiberNode
  }

  return createFiberNode(type, {
    ...props,
    children: children
      .flat()
      .map((child) =>
        typeof child === 'string' ? createFiberNode('TEXT_ELEMENT', { nodeValue: child }) : child
      )
  })
}
