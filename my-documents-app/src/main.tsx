import { h, render } from './core/fiber'
import { fTree } from './core/fiber/fTree'
import { App } from './ui/App'

const myfTree: Record<string, any> = {}

h.config({
  useFTree: true,
  fTree: myfTree
})

const rootDom = document.getElementById('root')
render(<App />, rootDom as HTMLElement)

console.log({ fTree })
