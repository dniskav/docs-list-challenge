import { NotificationList, Sort } from '..'
import { h } from '../../../core/fTree/jsxRuntime'

export function Header() {
  return (
    <header>
      <h2>Notificaciones</h2>
      <NotificationList wsAddress="ws://localhost:8080/notifications" />
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
