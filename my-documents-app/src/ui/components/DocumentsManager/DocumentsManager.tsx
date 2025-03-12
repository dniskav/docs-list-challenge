import { h } from '../../../core/fiber/jsxRuntime'
import { useState } from '../../../core/fiber/jsxRuntime'
import { createDocumentService } from '../../../modules/document/application/DocumentService'
import { HttpDocumentRepository } from '../../../modules/document/infrastructure/HttpDocumentRepository'
import { Document } from '../../../modules/document/domain/Document'

const documentService = createDocumentService(HttpDocumentRepository)

export function DocumentsManager() {
  const [documents, setDocuments, subscribeDocuments] = useState<Document[]>([])

  async function fetchDocuments() {
    const docs = await documentService.listDocuments()
    setDocuments(docs)
  }

  subscribeDocuments((updatedDocuments) => {
    console.log('📄 Estado actualizado:', updatedDocuments)
  })

  console.log('Renderizando DocumentsManager...')
  console.log('Estado actual de documentos:', documents)

  fetchDocuments() // 🔥 Esto debe ejecutarse dentro del flujo del renderizado

  return (
    <section>
      <h2>📄 Lista de Documentos</h2>
      <ul>
        {documents.length > 0 ? (
          documents.map((doc) => (
            <li key={doc.ID}>
              <h3>{doc.Title}</h3>
              <p>
                <strong>Versión:</strong> {doc.Version}
              </p>
              <p>
                <strong>Contribuidores:</strong> {doc.Contributors.map((c) => c.Name).join(', ')}
              </p>
              <p>
                <strong>Adjuntos:</strong> {doc.Attachments.join(', ')}
              </p>
            </li>
          ))
        ) : (
          <p>Cargando documentos...</p>
        )}
      </ul>
    </section>
  )
}
