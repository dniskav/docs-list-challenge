import { fTree } from './fTree'
import { setCurrentFid } from './hooks/hooksContext'
interface HConfig {
  useFTree: boolean
  fTree?: Record<string, any>
}

export const hConfig: HConfig = {
  useFTree: false,
  fTree: {}
}

let idCounter = 0
export function generateFID() {
  idCounter++
  return 'fid_' + idCounter
}

const processingStack: string[] = []

export function h(type: string | Function, props: Record<string, any> = {}, ...children: any[]) {
  let fid = props?.__fid || generateFID()

  if (!fTree[fid]) {
    fTree[fid] = {
      fid,
      type,
      props: {},
      state: {},
      childFids: []
    }
  }

  fTree[fid].props = {
    ...props,
    __fid: fid,
    children: processChildren(children.flat())
  }

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

  if (typeof type === 'function') {
    const compName = type.name || 'Anonymous'

    let currentHostFid =
      processingStack.length > 0 ? processingStack[processingStack.length - 1] : null

    processingStack.push(fid)

    if (currentHostFid) {
      fTree[currentHostFid].childFids?.push(fid)
    }

    setCurrentFid(fid)
    const subVNode = type(fTree[fid].props)
    setCurrentFid(null)

    if (!subVNode.__fid) {
      subVNode.__fid = fTree[fid].hostFid || generateFID()
    }

    fTree[fid].hostFid = subVNode.__fid

    if (subVNode && subVNode.props) {
      if (typeof subVNode.type === 'string') {
        subVNode.props = {
          ...subVNode.props,
          'data-ftree-component': compName
        }
      } else {
        console.warn('subVNode.props is undefined', subVNode)
      }
    }

    processingStack.pop()

    return subVNode
  }

  return {
    __fid: fid,
    type,
    props: fTree[fid].props
  }
}

export function processChildren(children: any[]) {
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

export const Fragment = ({ children }: { children: any[] }) => children
