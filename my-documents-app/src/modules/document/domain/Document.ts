export interface Contributor {
  ID: string
  Name: string
}

export interface Document {
  ID: string
  CreatedAt: Date
  UpdatedAt: Date
  Title: string
  Attachments: string[]
  Contributors: Contributor[]
  Version: string
}

export function createDocument(
  ID: string,
  CreatedAt: Date,
  UpdatedAt: Date,
  Title: string,
  Attachments: string[],
  Contributors: Contributor[],
  Version: string
): Document {
  return {
    ID,
    CreatedAt,
    UpdatedAt,
    Title,
    Attachments,
    Contributors,
    Version
  }
}

export function getFormattedDate(document: Document): string {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(document.CreatedAt)
}

export function hasAttachments(document: Document): boolean {
  return document.Attachments.length > 0
}
