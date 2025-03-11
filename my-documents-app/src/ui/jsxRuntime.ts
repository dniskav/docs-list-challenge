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
