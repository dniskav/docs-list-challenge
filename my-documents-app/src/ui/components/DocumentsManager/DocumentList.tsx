import { h } from '../../../core/fTree'
import styles from './documentList.module.css'

interface Props {
  documents: any[]
}

export function DocumentList({ documents }: Props) {
  return (
    <div className={styles['document-container']}>
      <h2>Documents</h2>

      {/* Encabezado */}
      <div className={styles['document-header']}>
        <span className={styles['document-header-title']}>Name</span>
        <span className={styles['document-header-contributors']}>Contributors</span>
        <span className={styles['document-header-attachments']}>Attachments</span>
      </div>

      {/* Lista de Documentos */}
      <ul className={styles['document-list']}>
        {documents?.map((doc) => (
          <li key={doc.ID} className={styles['document-item']}>
            <div className={styles['document-title']}>
              <strong>{doc.Title}</strong>
              <span className={styles['document-version']}>Version {doc.Version}</span>
            </div>

            <div className={styles['document-contributors']}>
              {doc.Contributors?.map((contributor, index) => (
                <span key={index}>{contributor.Name}</span>
              ))}
            </div>

            <div className={styles['document-attachments']}>
              {doc.Attachments?.map((attachment, index) => <span key={index}>{attachment}</span>)}
            </div>
          </li>
        ))}
      </ul>

      {/* Botón para añadir documento */}
      <div className={styles['add-document']}>+ Add document</div>
    </div>
  )
}
