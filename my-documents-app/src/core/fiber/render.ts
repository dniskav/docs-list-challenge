import { FiberNode } from './FiberNode'

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

export function render(element: FiberNode, container: HTMLElement) {
  if (typeof element.type === 'function') {
    const componentOutput = element.type(element.props)
    return render(componentOutput, container)
  }

  const dom = createDom(element)
  if (!dom) {
    console.error('🚨 Error creating DOM Node:', element)
    return
  }

  if (element.props?.children) {
    element.props.children.forEach((child: FiberNode) => {
      child.parent = element
      render(child, dom as HTMLElement)
    })
  }

  container.appendChild(dom)
}
