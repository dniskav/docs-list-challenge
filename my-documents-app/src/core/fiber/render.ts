import { createDom, FiberNode, linkParents } from '.'

let currentRoot: FiberNode | null = null
let workInProgressRoot: FiberNode | null = null

/**
 * Initiates the rendering process by creating a work-in-progress root,
 * linking parents, and committing the root to the DOM.
 * @param element - The root fiber node to be rendered.
 * @param container - The target HTML element to mount the rendered content.
 */
export function render(element: FiberNode, container: HTMLElement) {
  if (!element || typeof element !== 'object' || !element.type) {
    return
  }

  if (typeof element.type === 'function') {
    const componentOutput = element.type(element.props)

    const functionFiber: FiberNode = {
      ...componentOutput,
      parent: element.parent,
      dom: null,
      props: {
        ...componentOutput.props,
        'data-fiber-component': element.type.name || 'AnonymousComponent'
      }
    }

    return render(functionFiber, container)
  }

  workInProgressRoot = {
    ...element,
    parent: null,
    dom: null
  }

  linkParents(workInProgressRoot, null)

  if (workInProgressRoot) {
    commitRoot(container)
  } else {
    console.error('❌ ERROR: workInProgressRoot was not assigned correctly.')
  }
}

/**
 * Recursively commits fiber nodes to the DOM, ensuring correct parent-child
 * relationships and processing siblings.
 * @param fiber - The fiber node being committed.
 * @param container - The container where the node should be appended.
 */
function commitWork(fiber: FiberNode, container: HTMLElement) {
  if (!fiber) return

  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  if (fiber.parent) {
    const parentDom = fiber.parent.dom as HTMLElement
    if (fiber.dom && parentDom) {
      parentDom.appendChild(fiber.dom)
    }
  } else {
    if (fiber.dom instanceof Node) {
      container.appendChild(fiber.dom)
    } else {
      console.warn('⚠️ Invalid node detected, cannot append to DOM:', fiber.dom)
    }
  }

  // Recursively commit child and sibling nodes
  if (fiber.child) commitWork(fiber.child, fiber.dom as HTMLElement)
  if (fiber.sibling) commitWork(fiber.sibling, container)
}

/**
 * Commits the entire work-in-progress root to the DOM and updates the current root.
 * @param container - The root container where the fiber tree will be mounted.
 */
function commitRoot(container: HTMLElement) {
  if (!workInProgressRoot) {
    console.warn('⚠️ No workInProgressRoot to process.')
    return
  }

  commitWork(workInProgressRoot, container)

  // Save the current tree
  currentRoot = workInProgressRoot
  workInProgressRoot = null
}
