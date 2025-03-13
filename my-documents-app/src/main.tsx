import { App } from './ui/App'
/** @jsx h */
import { h } from './core/fiber'
import { render } from './core/fiber'
import './style.css'

// const root = document.getElementById('root')

// if (root) {
//   render(<App />, root)
// } else {
//   console.error('❌ No se encontró el elemento #root')
// }

const root = document.getElementById('root')
if (root) {
  render(<App />, root)
}
