export function h(tag: string | Function, props: any, ...children: any[]) {
  if (typeof tag === 'function') {
    return tag({ ...props, children })
  }

  const element = document.createElement(tag)

  for (let key in props) {
    if (key.startsWith('on')) {
      element.addEventListener(key.substring(2).toLowerCase(), props[key])
    } else {
      element.setAttribute(key, props[key])
    }
  }

  children.flat().forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  })

  return element
}

export function useState<T>(initialValue: T) {
  let state = initialValue
  const listeners = new Set<(value: T) => void>()

  function setState(newValue: T) {
    state = Array.isArray(newValue) ? [...newValue] : newValue // Clonar si es array
    console.log('📢 Estado actualizado:', state)

    // 🔥 Disparar la actualización a todos los suscriptores
    listeners.forEach((listener) => listener(state))
  }

  function useSubscription(callback: (value: T) => void) {
    listeners.add(callback)
    return () => listeners.delete(callback)
  }

  return [() => state, setState, useSubscription] as const
}
