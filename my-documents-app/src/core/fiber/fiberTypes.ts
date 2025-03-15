/**
 * Definición del tipo `FiberNode`
 */
export interface FiberNode {
  id: string // 🔥 Identificador único (hexadecimal, 8 caracteres)
  type: string | Function // Elemento HTML o Componente funcional
  props: Record<string, any> // Props del nodo, incluyendo `children`
  parent: FiberNode | null // Nodo padre
  child: FiberNode | null // ✅ Primer hijo
  nextChild: FiberNode | null // ✅ Hermano a la derecha
  dom: HTMLElement | Text | null // Referencia al nodo del DOM cuando se renderice
}
