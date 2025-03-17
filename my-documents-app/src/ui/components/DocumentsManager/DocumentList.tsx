import { Sort } from '..'
import { h } from '../../../core/fTree'
import { useEffect, useState } from '../../../core/fTree/hooks'
import { documentApi } from '../../../modules/document/application/DocumentApi'
import styles from './documentList.module.css'
import { Document } from '../../../modules/document/domain/Document'

export function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [sortedDocuments, setSortedDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState(false)

  const toggleGridView = (type: string) => {
    setView(type === 'grid' ? true : false)
  }
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await documentApi.listDocuments()
        setDocuments(docs)
        setSortedDocuments(docs)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const onSortChange = (key: string) => {
    const sorted = sortDocumentsAsc([...documents], key)
    setSortedDocuments(sorted)
  }

  if (loading) return <p>⏳ Cargando documentos...</p>
  if (error) return <p>❌ Error: {error}</p>

  return (
    <div className={styles['document-container']}>
      <h1>Documents</h1>
      <nav className={styles.controls}>
        <Sort onChange={onSortChange} />
        <section>
          <button onClick={() => toggleGridView('list')}>
            <i class="fas fa-list"></i>
          </button>
          <button onClick={() => toggleGridView('grid')}>
            <i class="fas fa-th"></i>
          </button>
        </section>
      </nav>
      {!view && (
        <div className={styles['document-header']}>
          <span className={styles['document-header-title']}>Name</span>
          <span className={styles['document-header-contributors']}>Contributors</span>
          <span className={styles['document-header-attachments']}>Attachments</span>
        </div>
      )}

      <ul className={view ? styles['grid-view'] : styles['list-view']}>
        {sortedDocuments.map((doc) => (
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

      <div className={styles['add-document']}>+ Add document</div>
    </div>
  )
}

// 🔥 Función para ordenar documentos
function sortDocumentsAsc(data: Document[], key: string) {
  return data.sort((a, b) => {
    let valueA: any = a[key as keyof Document] || ''
    let valueB: any = b[key as keyof Document] || ''

    if (key === 'Version') {
      valueA = valueA.split('.').map(Number)
      valueB = valueB.split('.').map(Number)

      for (let i = 0; i < Math.max(valueA.length, valueB.length); i++) {
        if ((valueA[i] || 0) !== (valueB[i] || 0)) {
          return (valueA[i] || 0) - (valueB[i] || 0)
        }
      }
      return 0
    }

    return valueA.localeCompare(valueB)
  })
}
