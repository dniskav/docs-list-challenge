import { FiberNode } from './FiberNode'

/**
 * Creates a DOM node from a FiberNode.
 *
 * @param fiber - The FiberNode to transform into a DOM node.
 * @returns The created DOM node (HTMLElement or Text) or null if the type is invalid.
 */
export function createDom(fiber: FiberNode): HTMLElement | Text | null {
  if (typeof fiber.type === 'function') {
    const componentOutput = fiber.type(fiber.props)
    return createDom(componentOutput)
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
      const eventType = key.toLowerCase().substring(2)
      dom.addEventListener(eventType, value)
    } else if (key !== 'children') {
      dom.setAttribute(key, value)
    }
  })

  return dom
}
