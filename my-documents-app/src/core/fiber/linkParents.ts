import { FiberNode } from '.'

let linkParentsCount = 0
let totalNodes = 0
const processedNodes = new WeakSet<FiberNode>()

export function linkParents(fiber: FiberNode, parent: FiberNode | null) {
  linkParentsCount++
  console.log(`🔗 linkParents() ejecutado ${linkParentsCount} veces`)

  if (processedNodes.has(fiber)) {
    console.warn(`⚠️ Nodo ya procesado, evitando loop:`, fiber)
    return
  }

  processedNodes.add(fiber)
  totalNodes++
  fiber.parent = parent

  if (fiber.props?.children) {
    let prevSibling: FiberNode | null = null

    const validChildren = fiber.props.children.filter(
      (child: any) => typeof child === 'object' && child !== null
    )

    validChildren.forEach((child: FiberNode, index: number) => {
      let node = child

      if (typeof child.type === 'function') {
        console.log(`🚀 Renderizando componente funcional: ${child.type.name}`)

        const componentOutput = child.type(child.props)

        if (!componentOutput || typeof componentOutput !== 'object') {
          console.error(`❌ Error: El componente ${child.type.name} no retornó un objeto válido.`)
          return
        }

        // 🔥 Aseguramos que el nodo tenga una referencia a las props correctas
        node = {
          ...componentOutput,
          parent: fiber, // Asigna correctamente el padre
          dom: null,
          props: {
            ...componentOutput.props, // 🔥 Copia las props procesadas
            'data-fiber-component': child.type.name || 'AnonymousComponent'
          }
        }
      }

      node.parent = fiber

      if (index === 0) {
        fiber.child = node
      } else {
        prevSibling!.sibling = node
      }
      prevSibling = node

      linkParents(node, fiber)
    })
  }

  if (parent === null) {
    console.log(`🌳 Fiber Tree construido con ${totalNodes} nodos.`, fiber)
    //console.log(`📌 Estructura final del Fiber Tree:`, JSON.stringify(fiber, null, 2))
  }
}
