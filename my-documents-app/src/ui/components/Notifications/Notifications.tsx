import { h } from '../../../core/fTree/jsxRuntime'
import { useWebSocket } from '../../../core/fTree/hooks'
import styles from './notifications.module.css'

export function NotificationList({ wsAddress }: { wsAddress: string }) {
  const { messages } = useWebSocket(wsAddress)

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notificationIcon}>
        <i className={`fas fa-bell ${styles.bellIcon}`}></i>
        {messages.length > 0 && <span className={styles.notificationBadge}>{messages.length}</span>}
      </div>
      <span className={styles.notificationText}>New document added</span>
    </div>
  )
}
