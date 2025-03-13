import { FiberNode } from './FiberNode'

export const attributeHandlers: Record<string, (dom: HTMLElement, value: any) => void> = {
  style: (dom, value) => {
    if (typeof value === 'object') {
      const styleString = Object.entries(value)
        .map(([prop, val]) => `${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}:${val}`)
        .join('; ')
      dom.setAttribute('style', styleString)
    }
  },
  className: (dom, value) => {
    dom.setAttribute('class', value)
  }
}

/**
 * Creates a DOM node from a FiberNode.
 *
 * @param fiber - The FiberNode to transform into a DOM node.
 * @returns The created DOM node (HTMLElement or Text) or null if the type is invalid.
 */
export function createDom(fiber: FiberNode): HTMLElement | Text | null {
  if (typeof fiber.type === 'function') {
    return createDom(fiber.type(fiber.props))
  }

  if (fiber.type === 'TEXT_ELEMENT') {
    return document.createTextNode(fiber.props.nodeValue)
  }

  if (typeof fiber.type !== 'string') {
    return null
  }

  const dom = document.createElement(fiber.type)

  Object.entries(fiber.props || {}).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      dom.addEventListener(key.toLowerCase().substring(2), value)
    } else if (attributeHandlers[key]) {
      attributeHandlers[key](dom as HTMLElement, value)
    } else if (key !== 'children') {
      dom.setAttribute(key, value)
    }
  })

  return dom
}
