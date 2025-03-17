// fTree.ts

export interface FNode {
  fid: string // Identificador único
  type: string | Function // Etiqueta nativa ("div", "button") o Componente (function)
  props: Record<string, any> // Props (incl. children)
  state: Record<string, any> // Un objeto de estado base (si deseas)
  domRef?: HTMLElement | null // Referencia al DOM, si lo renderizas
  hostFid?: string // Si es un componente, referencia al "nodo host" (DOM) que produce
  parent?: string // FID del padre en el árbol
  firstChild?: string // FID del primer hijo
  nextSibling?: string // FID del hermano siguiente
  hooks?: any[] // Array para almacenar valores de hooks (useState, etc.)
  childFids?: string[] // Array para almacenar los fid_host de los hijos
  effects?: { effect: Function; deps: any[]; cleanup?: Function }[] // Para `useEffect`
  hookIndex?: number // Índice actual del hook para este nodo
}

/**
 * Estructura global con todos los nodos.
 * Se llenará conforme llamemos a `h` o creamos nodos.
 */
export const fTree: Record<string, FNode> = {}

export function printTree(fid = 'fid_1', depth = 0) {
  const node = fTree[fid]
  if (!node) return

  const indent = '  '.repeat(depth)
  const isFunctionalComponent = typeof node.type === 'function'
  const nodeType = isFunctionalComponent ? node.type.name || 'Anonymous' : node.type
  const hostInfo = node.hostFid ? ` (host=${node.hostFid})` : ''
  const marker = isFunctionalComponent ? '📦' : '🏷️' // 📦 para componentes, 🏷️ para HTML tags

  // 📌 Inicia un grupo colapsable con un mejor formato
  console.groupCollapsed(`${indent}${marker} ${nodeType} (fid=${fid})${hostInfo}`)

  // 🔥 Mostrar los props de forma clara en la consola
  console.log('%cProps:', 'color: cyan; font-weight: bold;', node.props)

  // 🔥 Mostrar el domRef si es un tag HTML
  if (!isFunctionalComponent && node.domRef) {
    console.log('%cDOM Reference:', 'color: orange; font-weight: bold;', node.domRef)
  }

  // 🔥 Mostrar el estado si existe
  if (Object.keys(node.state).length > 0) {
    console.log('%cState:', 'color: green; font-weight: bold;', node.state)
  }

  // Recorremos los hijos
  node.childFids.forEach((childFid) => printTree(childFid, depth + 1))

  // 📌 Cierra el grupo
  console.groupEnd()
}

// Función para imprimir el árbol completo
export function logFTree() {
  console.log('%c🔍 **Árbol de fTree:**', 'font-weight: bold; color: yellow;')
  printTree()
}
