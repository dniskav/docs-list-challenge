import { Notifications, Sort } from '..'
import { h } from '../../../core/fiber/jsxRuntime'

export function Header() {
  return (
    <header>
      <Notifications />
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h1>📄 Documentos</h1>

        <nav aria-label="Opciones de visualización">
          <button>🔲 Vista Cuadrícula</button>
          <button>📄 Vista Lista</button>
        </nav>
      </div>
      <Sort />
    </header>
  )
}
