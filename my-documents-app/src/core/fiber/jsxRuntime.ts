function generateFID(): string {
  return 'f' + (Date.now().toString(16) + Math.random().toString(16).slice(2, 6)).slice(-8)
}

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

export function h(type: string | Function, props: Record<string, any> = {}, ...children: any[]) {
  const id = generateFID() // 🆔 Generar un ID único

  if (typeof type === 'function') {
    const resolvedProps = { ...props, children, __fid: id }

    // 🚀 Si el fTree está activo, inyectar estado
    if (hConfig.useFTree) {
      hConfig.fTree ||= {} // 📌 Asegurar que el fTree existe
      hConfig.fTree[id] ||= {
        name: type.name,
        state: {},
        props: resolvedProps, // ✅ Guardamos las props iniciales
        component: type, // 🔥 Guardar la referencia del componente en el fTree
        hRef: h // ✅ Guardar referencia a `h`
      }

      // 📌 Asignar referencia interna (sin pasarlo como prop)
      ;(type as any).__selfRef = id
    }

    // 🚀 Ejecutar la función del componente con las props modificadas
    const resolvedJSX = type(resolvedProps)

    return {
      type: resolvedJSX.type,
      props: {
        ...resolvedJSX.props,
        children: resolvedJSX.props.children,
        __fid: id // Mantener el ID en los props
      },
      __fid: id, // Mantener el ID en el nodo
      component: type
    }
  }

  if (hConfig.useFTree) {
    hConfig.fTree ||= {} // 📌 Asegurar que el fTree existe
    hConfig.fTree[id] ||= {
      name: type,
      state: {},
      props: {
        ...props,
        children: children,
        __fid: id
      },
      hRef: h // ✅ Guardar referencia a `h`
    }
  }

  return {
    type,
    props: {
      ...props,
      children: processChildren(children), // 🔄 Asegurar concatenación correcta de texto
      __fid: id
    },
    __fid: id, // 📌 Mantener ID único en todos los nodos
    component: null
  }
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
