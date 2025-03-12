import { h } from '../../../core/fiber/jsxRuntime'

export function Notifications() {
  const ws = new WebSocket('ws://localhost:8080/notifications')

  ws.onmessage = (event) => {
    const notification = JSON.parse(event.data)
    //console.log('📢 Nueva notificación:', notification)
  }

  return <div>Aquí van las notificaciones en tiempo real</div>
}
