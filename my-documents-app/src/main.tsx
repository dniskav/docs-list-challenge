import { App } from './ui/App'

const root = document.getElementById('root')

if (root) {
  root.appendChild(App())
} else {
  console.error('No se encontró el elemento #root en index.html')
}
