import { h } from '../../../../core/fTree'
import { useEffect, useState } from '../../../../core/fTree/hooks'
import styles from './dropdown.module.css'

interface DropdownProps {
  options: string[]
  onSelect: (option: string) => void
  placeholder?: string
}

export function Dropdown({ options, onSelect, placeholder = 'Select one...' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDropdown = () => {
    setIsOpen((prev: boolean) => !prev)
  }

  const handleSelect = (option: string) => {
    requestAnimationFrame(() => {
      onSelect(option)
      setIsOpen(false)
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.closest(`.${styles.dropdown}`)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
      <button className={styles['dropdown-toggle']} onClick={toggleDropdown}>
        {placeholder} {isOpen ? '∨' : '∧'}
      </button>
      {isOpen && (
        <ul className={styles['dropdown-menu']}>
          {options.map((option: string, index: number) => (
            <li
              key={index}
              className={styles['dropdown-item']}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
