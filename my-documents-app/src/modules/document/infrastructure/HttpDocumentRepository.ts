import { DocumentRepository } from './DocumentRepository'
import { Document, Contributor } from '../domain/Document'

const API_URL = 'http://localhost:8080/documents'

async function getAll(): Promise<Document[]> {
  const response = await fetch(API_URL)
  const data = await response.json()
  return data.map(mapToDocument)
}

async function getById(id: string): Promise<Document | null> {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) return null
  const doc = await response.json()
  return mapToDocument(doc)
}

function mapToDocument(doc: any): Document {
  return {
    ID: doc.ID,
    CreatedAt: new Date(doc.CreatedAt),
    UpdatedAt: new Date(doc.UpdatedAt),
    Title: doc.Title,
    Attachments: doc.Attachments,
    Contributors: doc.Contributors.map(
      (contributor: any): Contributor => ({
        ID: contributor.ID,
        Name: contributor.Name
      })
    ),
    Version: doc.Version
  }
}

// Exportamos la implementación funcional del repositorio
export const HttpDocumentRepository: DocumentRepository = {
  getAll,
  getById
}
