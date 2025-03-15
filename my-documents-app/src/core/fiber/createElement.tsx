// ✅ Convierte JSX en Elementos del DOM
export function createEl(el: any, fTree: any = null) {
  // ✅ Recibe el fTree como parámetro opcional
  const { props } = el
  const dom = document.createElement(el.type)

  if (typeof el.component === 'function') {
    dom.setAttribute('data-component', el.component.name) // 🔥 Marcar en el DOM
  }

  if (fTree && el) {
    // console.log(`🔥 Guardando domRef en fTree para ${el.props.__fid}`, dom)
    fTree[el.props.__fid].domRef = dom // 🔥 Guardamos la referencia del DOM en el fTree
  }

  if (props.children) {
    props.children.forEach((child) => {
      if (!child) return
      if (child.type === 'TEXT_ELEMENT') {
        child = document.createTextNode(child.props.nodeValue)
        dom.appendChild(child)
        return
      }
      dom.appendChild(createEl(child, fTree)) // ✅ Pasamos el fTree recursivamente
    })
  }

  Object.entries(el.props).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      dom.addEventListener(key.toLowerCase().substring(2), value)
    } else if (key === 'className') {
      dom.setAttribute('class', value)
    } else if (key.startsWith('data-')) {
      dom.setAttribute(key, value)
    } else if (key !== 'children') {
      dom.setAttribute(key, value)
    }
  })

  return dom
}
