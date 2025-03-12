import { h } from '../core/fiber/jsxRuntime'
import { Header, DocumentsManager } from './components'

export function App() {
  return (
    <div>
      <Header />

      <DocumentsManager />
    </div>
  )
}
