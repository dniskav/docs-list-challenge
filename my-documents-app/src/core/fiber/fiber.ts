import { createDom, FiberNode, generateFiberId } from '.'

/**
 * Crea un nodo Fiber con un identificador único de 8 caracteres en hexadecimal.
 * @param element - Elemento procesado en render()
 * @param parent - Nodo padre en el Fiber Tree
 * @returns Un nodo Fiber básico con ID compacto
 */
export function createFiberNode(element: any, parent: FiberNode | null = null): FiberNode {
  return {
    id: generateFiberId(), // 🔥 ID único generado externamente
    type: element.type,
    props: { ...element.props },
    parent,
    child: null,
    nextChild: null,
    dom: null // Se asignará en createDom()
  }
}

/**
 * Construye un Fiber Tree a partir de una estructura de elementos JSX procesados.
 *
 * @param element - El nodo raíz del JSX procesado.
 * @param parent - El nodo padre en el Fiber Tree (opcional).
 * @returns El nodo raíz del Fiber Tree construido.
 */
export function buildFiberTree(element: any, parent: FiberNode | null = null): FiberNode {
  if (!element || typeof element !== 'object' || !element.type) {
    return null as unknown as FiberNode // ❌ Fallback en caso de error
  }

  // 🚀 **Si es un componente funcional, lo ejecutamos y mantenemos la referencia**
  if (typeof element.type === 'function') {
    const resolvedJSX = element.type(element.props)

    // ✅ Mantenemos la referencia al componente funcional en `type`
    const fiber = createFiberNode(
      {
        type: element.type, // 🔥 No perdemos la referencia de la función
        props: {
          ...resolvedJSX.props,
          ['data-fiber-component']: element.type.name || 'AnonymousComponent' // ✅ Restauramos `data-fiber-component`
        }
      },
      parent
    )

    fiber.child = buildFiberTree(resolvedJSX, fiber)
    return fiber
  }

  // 🏗️ **Creamos el nodo Fiber normal**
  const fiber = createFiberNode(element, parent)

  if (element.props?.children) {
    const childrenArray = Array.isArray(element.props.children)
      ? element.props.children.filter((child) => child !== null && child !== undefined)
      : [element.props.children]

    // ✅ Si hay hijos, construimos el FiberTree correctamente
    if (childrenArray.length > 0 && typeof childrenArray[0] === 'object') {
      fiber.child = buildFiberTree(childrenArray[0], fiber)
    }

    // 🔗 Conectamos los hermanos (nextChild)
    let prevSibling: FiberNode | null = fiber.child
    for (let i = 1; i < childrenArray.length; i++) {
      if (typeof childrenArray[i] === 'object') {
        const siblingFiber = buildFiberTree(childrenArray[i], parent)
        if (prevSibling) prevSibling.nextChild = siblingFiber
        prevSibling = siblingFiber
      }
    }
  }

  return fiber
}

/**
 * Recursively renders the Fiber Tree into actual DOM nodes.
 *
 * @param fiber - The FiberNode to render
 * @returns The created DOM node
 */
export function renderFiberTree(fiber: FiberNode): HTMLElement | Text | null {
  if (!fiber) return null

  // 🌱 Crear el nodo del DOM a partir del FiberNode
  const dom = createDom(fiber)
  fiber.dom = dom // Asociamos el DOM con el FiberNode

  // 🔗 Renderizamos los hijos y los agregamos al nodo principal
  let child = fiber.child
  while (child) {
    const childDom = renderFiberTree(child)
    if (childDom) dom?.appendChild(childDom) // Añadir hijos al nodo padre
    child = child.nextChild
  }

  return dom
}
