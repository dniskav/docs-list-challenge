import { createFiberNode, FiberNode } from '.'

export function createDom(fiber: FiberNode): HTMLElement | Text | null {
  if (!fiber.type) return null

  if (fiber.type === 'TEXT_ELEMENT') {
    return document.createTextNode(fiber.props.nodeValue || '')
  }

  // ✅ Si el Fiber es un Componente Funcional, lo evaluamos antes
  if (typeof fiber.type === 'function') {
    console.warn(`⚠️ Componente funcional detectado en createDom: ${fiber.type.name}`)

    const resolvedFiber = fiber.type(fiber.props) // 🔄 Ejecutamos el componente
    const newFiber = createFiberNode(resolvedFiber, fiber.parent) // 🔄 Convertimos en FiberNode

    return createDom(newFiber) // 🔄 Llamamos de nuevo con el nuevo FiberNode
  }

  // 🌱 Crear el nodo principal del Fiber
  const dom = document.createElement(fiber.type as string)

  // ✅ Si `props.children` es un string o número, lo asignamos
  if (typeof fiber.props.children === 'string' || typeof fiber.props.children === 'number') {
    dom.textContent = String(fiber.props.children)
  }

  // 🔥 Asignar atributos y eventos
  Object.entries(fiber.props || {}).forEach(([key, value]) => {
    console.log({ key, value })
    if (key.startsWith('on') && typeof value === 'function') {
      dom.addEventListener(key.toLowerCase().substring(2), value)
    } else if (key === 'className') {
      dom.setAttribute('class', value)
    } else if (key.startsWith('data-')) {
      // ✅ Permitir atributos personalizados (ej: data-fiber-component)
      dom.setAttribute(key, value)
    } else if (key !== 'children') {
      dom.setAttribute(key, value)
    }
  })

  return dom
}

// import { FiberNode } from './FiberNode'

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

// /**
//  * Creates a DOM node from a FiberNode.
//  *
//  * @param fiber - The FiberNode to transform into a DOM node.
//  * @returns The created DOM node (HTMLElement or Text) or null if the type is invalid.
//  */
// export function createDom(fiber: FiberNode): HTMLElement | Text | null {
//   console.log(`🛠️ Debug - Nodo en createDom:`, fiber)

//   if (typeof fiber.type === 'function') {
//     return createDom(fiber.type(fiber.props))
//   }

//   if (fiber.type === 'TEXT_ELEMENT') {
//     return document.createTextNode(fiber.props.nodeValue)
//   }

//   if (typeof fiber.type !== 'string') {
//     return null
//   }

//   const dom = document.createElement(fiber.type)

//   Object.entries(fiber.props || {}).forEach(([key, value]) => {
//     if (key.startsWith('on') && typeof value === 'function') {
//       dom.addEventListener(key.toLowerCase().substring(2), value)
//     } else if (attributeHandlers[key]) {
//       attributeHandlers[key](dom as HTMLElement, value)
//     } else if (key !== 'children') {
//       dom.setAttribute(key, value)
//     }
//   })

//   console.log(`✅ Nodo final en createDom:`, dom)
//   return dom
// }
