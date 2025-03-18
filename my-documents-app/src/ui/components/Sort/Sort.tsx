import { h } from '../../../core/fTree/jsxRuntime'
import { Dropdown } from '../utils/Dropdown/Dropdown'
import styles from './sort.module.css'
interface Props {
  onChange: (sort: string) => void
}

export function Sort({ onChange }: Props) {
  return (
    <div className={styles.sort}>
      <span>Sort by: </span>
      <Dropdown options={['Title', 'Version']} onSelect={onChange} />
    </div>
  )
}
