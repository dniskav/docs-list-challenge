import { h } from '../../../core/fTree/jsxRuntime'
import { useWebSocket } from '../../../core/fTree/hooks'

export function NotificationList({ wsAddress }: { wsAddress: string }) {
  const { messages, isConnected, error } = useWebSocket(wsAddress)

  if (error) return <p>❌ Error en WebSocket: {error}</p>

  return (
    <div>
      <h2>Notificaciones {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <section>
              <p>
                <strong>Timestamp:</strong> {msg.Timestamp}
              </p>
              <p>
                <strong>UserID:</strong> {msg.UserID}
              </p>
              <p>
                <strong>UserName:</strong> {msg.UserName}
              </p>
              <p>
                <strong>DocumentID:</strong> {msg.DocumentID}
              </p>
              <p>
                <strong>DocumentTitle:</strong> {msg.DocumentTitle}
              </p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  )
}
