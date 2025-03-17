import { Document } from '../domain/Document'
import { DocumentRepository } from '../infrastructure'

export function documentService(repository: DocumentRepository) {
  const listDocuments = async (): Promise<Document[]> => {
    return await repository.getAll()
  }

  const findDocumentById = async (id: string): Promise<Document | null> => {
    return await repository.getById(id)
  }

  return { listDocuments, findDocumentById }
}
