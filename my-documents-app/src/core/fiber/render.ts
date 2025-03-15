import { buildFiberTree, renderFiberTree } from './fiber'

/**
 * Processes JSX and converts it into a structured object.
 * Executes functional components and processes children recursively.
 *
 * @param element - JSX element or functional component
 * @returns A structured object representing the component tree
 */
export function render(element: any, container: HTMLElement): void {
  if (!element || typeof element !== 'object' || !element.type) {
    console.error('❌ Elemento inválido para renderizar.')
    return
  }

  const structuredElement = processJSX(element)

  const fiberTree = buildFiberTree(structuredElement)

  const domtree = renderFiberTree(fiberTree)

  container.appendChild(domtree)

  console.log('✅ Renderizado completo 🎉', domtree, fiberTree)
}

/**
 * Convierte un JSX en una estructura base (objeto con props y children).
 * - Si es un componente funcional, ejecuta su función y procesa el resultado.
 * - Si es un nodo HTML, procesa sus props y children.
 */
export function processJSX(element: any): any {
  if (!element || typeof element !== 'object' || !element.type) {
    return null
  }

  const isFunctionComponent = typeof element.type === 'function'

  // ✅ Base del nodo
  const node: any = {
    type: element.type,
    props: {
      ...element.props,
      children: []
    }
  }

  if (isFunctionComponent) {
    const componentOutput = processJSX(element.type(element.props)) // 🔄 Ejecutamos su función

    if (!componentOutput || typeof componentOutput !== 'object') {
      console.error(`❌ Componente inválido: ${element.type.name || 'AnonymousComponent'}`)
      return null
    }

    // 🔥 Guardamos el resultado como hijo único
    node.props.children = [componentOutput]

    // 📌 Marca para depuración
    node.props['data-fiber-component'] = element.type.name || 'AnonymousComponent'
  } else {
    if (element.props?.children) {
      node.props.children = (
        Array.isArray(element.props.children) ? element.props.children : [element.props.children]
      )
        .flat() // 🔄 Evitar arrays anidados
        .map((child: any) => processJSX(child)) // 🔄 Recursión en cada hijo
        .filter(Boolean) // 🚀 Eliminar `null` o `undefined`
    }
  }
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
