// ✅ Definir la interfaz para la configuración de `h`
interface HConfig {
  useFTree: boolean
  fTree?: Record<string, any>
}

// 🔧 Configuración global de `h` con tipado seguro
export const hConfig: HConfig = {
  useFTree: false, // 🚀 Solo usará fTree si se configura
  fTree: {}
}

// ✅ Método `h.config()` para configurar fTree
h.config = (newConfig: HConfig) => {
  Object.assign(hConfig, newConfig)
}

h.getConfig = () => hConfig

// ✅ Función para procesar los hijos y unir nodos de texto adyacentes
function processChildren(children: any[]) {
  return children.flat().reduce((acc, child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      if (acc.length > 0 && acc[acc.length - 1].type === 'TEXT_ELEMENT') {
        acc[acc.length - 1].props.nodeValue += child
      } else {
        acc.push({ type: 'TEXT_ELEMENT', props: { nodeValue: String(child) } })
      }
    } else {
      acc.push(child)
    }
    return acc
  }, [])
}

// h.ts
import { fTree } from './fTree'
import { setCurrentFid } from './hooks/hooksContext'

// Función para generar IDs únicos
let idCounter = 0
function generateFID() {
  idCounter++
  return 'fid_' + idCounter
}

const processingStack: string[] = [] // 🔥 Pila para rastrear el orden de procesamiento

/**
 * `h` function:
 * - Registra el fid en fTree
 * - Si es componente => invoca la función
 */
// h.ts
export function h(type: string | Function, props: Record<string, any> = {}, ...children: any[]) {
  let fid = props?.__fid || generateFID()
  const compName = typeof type === 'function' ? type.name || 'Anonymous' : type

  const currentHostFid = processingStack[processingStack.length - 1] || null

  // 📌 Revisar si el nodo ya existe dentro de los hijos del hostFid
  const existingNode = currentHostFid
    ? fTree[currentHostFid]?.childFids.find((fid) => fTree[fid]?.type === type)
    : null

  // if (existingNode) {
  //   console.log(`♻️ Reutilizando fid: ${existingNode} para ${compName}`)
  //   fid = existingNode
  // } else {
  //   console.log(`🆕 Creando nuevo fid para ${compName}`)
  // }

  if (!fTree[fid]) {
    fTree[fid] = {
      fid,
      type,
      props: {},
      state: {},
      childFids: [] // 🔥 Inicializar propiedad para almacenar los fid_host de los hijos
    }
  }

  fTree[fid].props = {
    ...props,
    __fid: fid,
    children: processChildren(children.flat())
  }

  // 📌 Extraer los fid_host desde el hostFid si existen elementos anidados
  if (fTree[fid].hostFid) {
    const hostNode = fTree[fTree[fid].hostFid]
    if (hostNode) {
      fTree[fid].childFids = Object.values(fTree)
        .filter(
          (node) =>
            node.type && typeof node.type === 'function' && node.hostFid === fTree[fid].hostFid
        )
        .map((node) => node.fid)
    }
  }

  // Componente vs. nodo nativo
  if (typeof type === 'function') {
    const compName = type.name || 'Anonymous'

    let currentHostFid =
      processingStack.length > 0 ? processingStack[processingStack.length - 1] : null

    // if (currentHostFid) {
    //   console.log(
    //     `🛠️ Procesando ${compName} (fid=${fid}), hijo de ${fTree[currentHostFid]?.type?.name || 'root'} (host_fid=${currentHostFid})`
    //   )
    // } else {
    //   console.log(`🛠️ Procesando ${compName} (fid=${fid}), sin padre (es root)`)
    // }

    // 📌 Agregar al stack cuando comienza el procesamiento
    processingStack.push(fid)
    // console.log(`🟢 Iniciando procesamiento de componente: ${compName} (fid=${fid})`)

    // 📌 Si este componente tiene un padre funcional, agregarlo a su `childFids`
    if (currentHostFid) {
      fTree[currentHostFid].childFids.push(fid)
    }

    // Establecer currentFid para que useState apunte a este componente
    setCurrentFid(fid)
    const subVNode = type(fTree[fid].props)
    setCurrentFid(null)

    // 📌 Antes de modificar `fTree`, resolvemos el JSX y contamos los hijos funcionales
    const jsxChildrenFiltered = subVNode.props.children
      .flat()
      .filter((child) => typeof child.type === 'function')
    // console.log(
    //   `🧐 Componente ${compName} (fid=${fid}) tiene ${jsxChildrenFiltered.length} hijos funcionales.`
    // )

    // Asignar un fid si no lo tiene
    if (!subVNode.__fid) {
      subVNode.__fid = fTree[fid].hostFid || generateFID()
    }

    // Guardar hostFid
    fTree[fid].hostFid = subVNode.__fid

    // data-ftree-component si NO es Fragment
    if (subVNode.type !== Fragment && typeof subVNode.type === 'string') {
      subVNode.props = {
        ...subVNode.props,
        'data-ftree-component': compName
      }
    }

    // 📌 Sacar del stack cuando termina el procesamiento
    processingStack.pop()
    // console.log(`🔴 Terminando procesamiento de componente: ${compName} (fid=${fid})`)

    return subVNode
  }

  // Etiqueta nativa (string)
  return {
    __fid: fid,
    type,
    props: fTree[fid].props
  }
}

// Un <Fragment> minimal (si lo usas)
export function Fragment(props: { children?: any }) {
  // Normalmente un Fragment no crea un nodo real,
  // pero para tu experiencia, podrías o no registrarlo en fTree.
  return props.children
}
