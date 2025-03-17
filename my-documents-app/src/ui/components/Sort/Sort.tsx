import { h } from '../../../core/fTree/jsxRuntime'
import styles from './sort.module.css'
interface Props {
  onChange: (sort: string) => void
}

export function Sort({ onChange }: Props) {
  return (
    <label className={styles.sort}>
      <span>Sort by: </span>
      <select
        onChange={(e: any) => {
          onChange(e.target.value)
        }}
      >
        <option>Name</option>
        <option>Version</option>
      </select>
    </label>
  )
}
