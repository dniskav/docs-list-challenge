import { FiberNode, generateFiberId } from '.'

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
    sibling: null,
    dom: null // Se asignará en createDom()
  }
}
