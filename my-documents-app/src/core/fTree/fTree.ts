// fTree.ts

import { FNode } from './fTreeTypes'

export const fTree: Record<string, FNode> = {}

export function printTree(fid = 'fid_1', depth = 0) {
  const node = fTree[fid]
  if (!node) return

  const indent = '  '.repeat(depth)
  const isFunctionalComponent = typeof node.type === 'function'
  const nodeType = isFunctionalComponent ? node.type.name || 'Anonymous' : node.type
  const hostInfo = node.hostFid ? ` (host=${node.hostFid})` : ''
  const marker = isFunctionalComponent ? '📦' : '🏷️' // 📦 para componentes, 🏷️ para HTML tags

  console.groupCollapsed(`${indent}${marker} ${nodeType} (fid=${fid})${hostInfo}`)

  console.log('%cProps:', 'color: cyan; font-weight: bold;', node.props)

  if (!isFunctionalComponent && node.domRef) {
    console.log('%cDOM Reference:', 'color: orange; font-weight: bold;', node.domRef)
  }

  if (Object.keys(node.state).length > 0) {
    console.log('%cState:', 'color: green; font-weight: bold;', node.state)
  }

  node.childFids?.forEach((childFid) => printTree(childFid, depth + 1))

  console.groupEnd()
}

export function logFTree() {
  console.log('%c🔍 **Árbol de fTree:**', 'font-weight: bold; color: yellow;')
  printTree()
}
