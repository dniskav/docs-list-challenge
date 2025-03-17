import { NotificationList, Sort } from '..'
import { h } from '../../../core/fTree/jsxRuntime'
import style from './header.module.css'

export function Header() {
  return (
    <header className={style.header}>
      <NotificationList wsAddress="ws://localhost:8080/notifications" />
    </header>
  )
}
