import { fTree } from './fTree'

export function render(vnode: any, parentDom?: HTMLElement): HTMLElement | Text | null {
  if (!vnode) return null

  const fid = vnode.__fid
  const nodeData = fTree[fid]
  if (!nodeData) return null

  if (typeof nodeData.type === 'function') {
    const hostFid = nodeData.hostFid
    if (!hostFid) return null
    fTree[fid].hostFid = hostFid
    return render({ __fid: hostFid }, parentDom)
  }

  // not Fragment => render children
  // if (nodeData.type === Fragment) {
  //   // nodeData.props.children => array
  //   let domLast: HTMLElement | Text | null = null
  //   for (const child of nodeData.props.children) {
  //     const childDom = render(child, parentDom)
  //     if (childDom) domLast = childDom
  //   }
  //   return domLast
  // }

  const domEl = document.createElement(nodeData.type as string)
  nodeData.domRef = domEl

  const { children, __fid, ...rest } = nodeData.props
  for (const [k, v] of Object.entries(rest)) {
    if (k.startsWith('on') && typeof v === 'function') {
      const evt = k.slice(2).toLowerCase()
      domEl.addEventListener(evt, v)
    } else if (k.startsWith('data-')) {
      domEl.setAttribute(k, String(v))
    } else if (k === 'className') {
      domEl.setAttribute('class', String(v))
    } else if (k !== '__fid') {
      domEl.setAttribute(k, String(v))
    }
  }

  for (const child of children) {
    if (child == null) continue
    if (typeof child === 'string' || typeof child === 'number') {
      domEl.appendChild(document.createTextNode(String(child)))
    } else if (child?.type === 'TEXT_ELEMENT') {
      domEl.appendChild(document.createTextNode(child.props.nodeValue))
    } else if (child && child.__fid) {
      render(child, domEl)
    }
  }

  if (parentDom) {
    parentDom.appendChild(domEl)
  }
  return domEl
}
