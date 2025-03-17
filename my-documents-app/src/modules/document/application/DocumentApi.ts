import { HttpDocumentRepository } from '../infrastructure'
import { documentService } from './DocumentService'

export const documentApi = documentService(HttpDocumentRepository)
