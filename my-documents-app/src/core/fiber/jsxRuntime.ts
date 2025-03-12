import { createFiberNode, FiberNode } from './FiberNode'

export function h(
  type: string | Function,
  props: Record<string, any> = {},
  ...children: any[]
): FiberNode {
  if (typeof type === 'object') {
    return type
  }

  return createFiberNode(type, {
    ...props,
    children: children
      .flat()
      .map((child) =>
        typeof child === 'string'
          ? createFiberNode('TEXT_ELEMENT', { nodeValue: child })
          : createFiberNode(child.type, child.props)
      )
  })
}
