import { h, render } from './core/fTree'
import { App } from './App'
import './style.module.css'

const rootDom = document.getElementById('root')
render(<App />, rootDom as HTMLElement)
