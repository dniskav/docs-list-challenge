import { h } from './core/fTree/jsxRuntime'
import { Home } from './ui/views/Home/Home'
import styles from './app.module.css'

export function App() {
  return (
    <div className={styles.app}>
      <Home />
    </div>
  )
}
