import { h } from '../../../core/fTree/jsxRuntime'
import styles from './addDocumentModal.module.css'

interface Props {
  onClose: () => void
  onAdd: (newDocument: any) => void
}

export function AddDocumentModal({ onClose, onAdd }: Props) {
  let formData = {
    title: '',
    version: '',
    contributors: '',
    attachments: ''
  }

  const handleChange = (e: any) => {
    formData = { ...formData, [e.target.name]: e.target.value }
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const newDocument = {
      ID: crypto.randomUUID(),
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      Title: formData.title,
      Version: formData.version,
      Contributors: formData.contributors
        .split(',')
        .map((name) => ({ ID: crypto.randomUUID(), Name: name.trim() })),
      Attachments: formData.attachments.split(',').map((att) => att.trim())
    }
    onAdd(newDocument)
    onClose()
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add New Document</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onInput={handleChange}
              required
            />
          </label>
          <label>
            Version:
            <input
              type="text"
              name="version"
              value={formData.version}
              onInput={handleChange}
              required
            />
          </label>
          <label>
            Contributors (comma-separated):
            <input
              type="text"
              name="contributors"
              value={formData.contributors}
              onInput={handleChange}
            />
          </label>
          <label>
            Attachments (comma-separated):
            <input
              type="text"
              name="attachments"
              value={formData.attachments}
              onInput={handleChange}
            />
          </label>
          <button type="submit" className={styles.addButton}>
            Add Document
          </button>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}
