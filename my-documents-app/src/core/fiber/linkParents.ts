import { FiberNode } from '.'

/**
 * Recursively assigns the `parent` property to each fiber node
 * and links sibling nodes together.
 * @param fiber - The fiber node being processed.
 * @param parent - The parent fiber node.
 */
export function linkParents(fiber: FiberNode, parent: FiberNode | null) {
  console.log('📌 Antes de procesar nodo:', {
    type: fiber.type,
    isFunction: typeof fiber.type === 'function',
    props: fiber.props,
    children: fiber.props?.children
  })

  fiber.parent = parent

  if (fiber.props?.children) {
    let prevSibling: FiberNode | null = null

    // Filtramos hijos válidos
    const validChildren = fiber.props.children.filter(
      (child: any) => typeof child === 'object' && child !== null
    )

    console.log(`🔍 Nodo ${fiber.type} tiene ${validChildren.length} hijos válidos.`)

    validChildren.forEach((child: FiberNode, index: number) => {
      let node = child

      if (typeof child.type === 'function') {
        console.log(
          `🚀 Procesando componente funcional: ${child.type.name || 'AnonymousComponent'}`
        )

        const componentOutput = child.type(child.props)

        if (!componentOutput || typeof componentOutput !== 'object') {
          console.error(
            `❌ Error: El componente ${child.type.name || 'AnonymousComponent'} no retornó un objeto válido.`
          )
          return
        }

        node = {
          ...componentOutput,
          parent: fiber,
          dom: null,
          props: {
            ...componentOutput.props,
            'data-fiber-component': child.type.name || 'AnonymousComponent'
          }
        }

        console.log(
          `✅ Componente funcional ${child.type.name || 'AnonymousComponent'} renderizado correctamente.`
        )
      }

      node.parent = fiber

      if (index === 0) {
        fiber.child = node
        console.log(`🧩 Asignando primer hijo a ${fiber.type}:`, node)
      } else {
        prevSibling!.sibling = node
        console.log(`🔗 Asignando hermano a ${prevSibling!.type}:`, node)
      }
      prevSibling = node

      linkParents(node, fiber)
    })
  }

  console.log('✅ Después de procesar nodo:', {
    type: fiber.type,
    child: fiber.child,
    sibling: fiber.sibling,
    parent: fiber.parent?.type || null
  })
}
