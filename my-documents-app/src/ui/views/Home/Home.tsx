import { useFetch } from '../../../core/fTree/hooks'
import { h } from '../../../core/fTree/jsxRuntime'
import { Header } from '../../components'
import { DocumentList } from '../../components/DocumentsManager/DocumentList'

export function Home() {
  const { data: documents, loading, error } = useFetch<any[]>('http://localhost:8080/documents')

  if (loading) return <p>⏳ Cargando documentos...</p>
  if (error) return <p>❌ Error: {error}</p>
  return (
    <div>
      <Header />

      <main>
        {' '}
        <nav aria-label="Opciones de visualización">
          <button>🔲 Vista Cuadrícula</button>
          <button>📄 Vista Lista</button>
        </nav>
        <DocumentList documents={documents} />
      </main>
    </div>
  )
}
