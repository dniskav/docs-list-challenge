export interface FNode {
  readonly fid: string
  readonly type: string | Function
  props: Record<string, any>
  state: Record<string, any>
  domRef?: HTMLElement | null
  hostFid?: string
  parent?: string
  firstChild?: string
  nextSibling?: string
  hooks?: any[]
  childFids?: string[]
  effects?: EffectHook[]
  hookIndex?: number
}

export interface EffectHook {
  effect: () => void | (() => void)
  deps: any[]
  cleanup?: () => void
}

export {}
