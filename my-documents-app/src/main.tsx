import { h, render } from './core/fTree'
import { fTree } from './core/fTree/fTree'
import { App } from './ui/App'

const rootDom = document.getElementById('root')
render(<App />, rootDom as HTMLElement)

console.log({ fTree })
