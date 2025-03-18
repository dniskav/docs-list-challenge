import { useEffect, useState } from '.'

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let socket: WebSocket

    const connectWebSocket = () => {
      socket = new WebSocket(url)

      socket.onopen = () => {
        setIsConnected(true)
      }

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setMessages((prevMessages: any[]) => [...prevMessages, data])
        } catch (err) {
          setError(`❌ Error on message WebSocket: ${err}`)
        }
      }

      socket.onerror = (err) => {
        setError(`❌ WebSocket error: ${err}`)
      }

      socket.onclose = () => {
        console.warn('🔴 WebSocket closed. Reconnecting...')
        setIsConnected(false)
        setTimeout(connectWebSocket, 3000)
      }
    }

    connectWebSocket()

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [url])

  return { messages, isConnected, error }
}
