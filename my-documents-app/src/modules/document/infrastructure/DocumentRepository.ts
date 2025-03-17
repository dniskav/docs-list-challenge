import { Document } from '../domain/Document'

export interface DocumentRepository {
  getAll(): Promise<Document[]>
  getById(id: string): Promise<Document | null>
}
