import { h } from '../../../core/fTree'
import { useFetch } from '../../../core/fTree/hooks'

export function DocumentsManager() {
  return (
    <div>
      <DocumentList />
    </div>
  )
}

export function DocumentList() {
  const { data: documents, loading, error } = useFetch<any[]>('http://localhost:8080/documents')

  if (loading) return <p>⏳ Cargando documentos...</p>
  if (error) return <p>❌ Error: {error}</p>

  return (
    <div>
      <h2>Lista de Documentos</h2>
      <ul>
        {documents?.map((doc) => (
          <li key={doc.ID}>
            <section>
              <p>
                <strong>ID:</strong> {doc.ID}
              </p>
              <p>
                <strong>CreatedAt:</strong> {doc.CreatedAt}
              </p>
              <p>
                <strong>UpdatedAt:</strong> {doc.UpdatedAt}
              </p>
              <p>
                <strong>Title:</strong> {doc.Title}
              </p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  )
}
