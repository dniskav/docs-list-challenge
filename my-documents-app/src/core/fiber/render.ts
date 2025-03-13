import { FiberNode } from './core/fiber'

/**
 * Processes JSX and converts it into a structured object.
 * Executes functional components and processes children recursively.
 *
 * @param element - JSX element or functional component
 * @returns A structured object representing the component tree
 */
export function render(element: any): any {
  if (!element || typeof element !== 'object' || !element.type) {
    return null
  }

  console.log(`🔍 Procesando elemento:`, element) // 🛠️ Debug

  const isFunctionComponent = typeof element.type === 'function'

  // ✅ Guardamos la referencia de la función en `type` si es un componente funcional
  const node: any = {
    type: element.type, // Mantenemos la referencia si es una función
    props: {
      ...element.props,
      children: []
    }
  }

  if (isFunctionComponent) {
    console.log(`🚀 Ejecutando componente funcional: ${element.type.name}`)

    const componentOutput = render(element.type(element.props)) // Renderizamos su salida

    if (!componentOutput || typeof componentOutput !== 'object') {
      console.error(`❌ Componente inválido: ${element.type.name || 'AnonymousComponent'}`)
      return null
    }

    // 🔥 Mantenemos la referencia y guardamos el resultado en props.children
    node.props.children = [componentOutput]

    // 📌 Agregamos la marca de depuración en el nodo
    node.props['data-fiber-component'] = element.type.name || 'AnonymousComponent'
  } else {
    if (element.props?.children) {
      console.log(`🛠️ Procesando hijos de: ${element.type}`, element.props.children)

      node.props.children = (
        Array.isArray(element.props.children) ? element.props.children : [element.props.children]
      )
        .flat() // 🔄 Evitar arrays anidados
        .map((child: any) => render(child)) // 🔄 Recursión en cada hijo
        .filter(Boolean) // 🚀 Eliminar elementos `null` o `undefined`
    }
  }

  console.log(`✅ Nodo construido:`, node) // 🛠️ Debug final del nodo
  return node
}

// import { createDom, FiberNode, linkParents } from '.'

// let currentRoot: FiberNode | null = null
// let workInProgressRoot: FiberNode | null = null
// let renderCount = 0
// /**
//  * Initiates the rendering process by creating a work-in-progress root,
//  * linking parents, and committing the root to the DOM.
//  * @param element - The root fiber node to be rendered.
//  * @param container - The target HTML element to mount the rendered content.
//  */
// export function render(element: FiberNode, container: HTMLElement) {
//   renderCount++
//   console.log(`🔄 render() ejecutado ${renderCount} veces`)

//   if (!element || typeof element !== 'object' || !element.type) {
//     return
//   }

//   if (typeof element.type === 'function') {
//     const componentOutput = element.type(element.props)

//     const functionFiber: FiberNode = {
//       ...componentOutput,
//       parent: element.parent,
//       dom: null,
//       props: {
//         ...componentOutput.props,
//         'data-fiber-component': element.type.name || 'AnonymousComponent'
//       }
//     }

//     return render(functionFiber, container)
//   }

//   workInProgressRoot = {
//     ...element,
//     parent: null,
//     dom: null
//   }

//   linkParents(workInProgressRoot, null)

//   if (workInProgressRoot) {
//     commitRoot(container)
//   } else {
//     console.error('❌ ERROR: workInProgressRoot was not assigned correctly.')
//   }
// }

// /**
//  * Recursively commits fiber nodes to the DOM, ensuring correct parent-child
//  * relationships and processing siblings.
//  * @param fiber - The fiber node being committed.
//  * @param container - The container where the node should be appended.
//  */
// function commitWork(fiber: FiberNode, container: HTMLElement) {
//   if (!fiber) return

//   if (!fiber.dom) {
//     fiber.dom = createDom(fiber)
//   }

//   if (fiber.parent) {
//     const parentDom = fiber.parent.dom as HTMLElement
//     if (fiber.dom && parentDom) {
//       parentDom.appendChild(fiber.dom)
//     }
//   } else {
//     if (fiber.dom instanceof Node) {
//       container.appendChild(fiber.dom)
//     } else {
//       console.warn('⚠️ Invalid node detected, cannot append to DOM:', fiber.dom)
//     }
//   }

//   // Recursively commit child and sibling nodes
//   if (fiber.child) commitWork(fiber.child, fiber.dom as HTMLElement)
//   if (fiber.sibling) commitWork(fiber.sibling, container)
// }

// /**
//  * Commits the entire work-in-progress root to the DOM and updates the current root.
//  * @param container - The root container where the fiber tree will be mounted.
//  */
// function commitRoot(container: HTMLElement) {
//   if (!workInProgressRoot) {
//     console.warn('⚠️ No workInProgressRoot to process.')
//     return
//   }

//   commitWork(workInProgressRoot, container)

//   // Save the current tree
//   currentRoot = workInProgressRoot
//   workInProgressRoot = null
// }
