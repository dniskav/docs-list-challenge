import {
  createDocument,
  getFormattedDate,
  hasAttachments,
  Document,
  Contributor
} from '../Document'

describe('📄 Document Utility Functions', () => {
  const mockContributors: Contributor[] = [
    { ID: '1', Name: 'John Doe' },
    { ID: '2', Name: 'Jane Doe' }
  ]

  const mockDocument: Document = {
    ID: '123',
    CreatedAt: new Date('2023-01-01T12:00:00Z'),
    UpdatedAt: new Date('2023-02-01T12:00:00Z'),
    Title: 'Test Document',
    Attachments: ['file1.pdf', 'file2.pdf'],
    Contributors: mockContributors,
    Version: '1.0.0'
  }

  test('✅ createDocument should return a valid document object', () => {
    const document = createDocument(
      mockDocument.ID,
      mockDocument.CreatedAt,
      mockDocument.UpdatedAt,
      mockDocument.Title,
      mockDocument.Attachments,
      mockDocument.Contributors,
      mockDocument.Version
    )

    expect(document).toEqual(mockDocument)
  })

  test('✅ getFormattedDate should return a correctly formatted date', () => {
    const formattedDate = getFormattedDate(mockDocument)
    expect(formattedDate).toBe('1 ene 2023') // Ajusta según el locale configurado
  })

  test('✅ hasAttachments should return true if document has attachments', () => {
    expect(hasAttachments(mockDocument)).toBe(true)
  })

  test('✅ hasAttachments should return false if document has no attachments', () => {
    const documentWithoutAttachments = { ...mockDocument, Attachments: [] }
    expect(hasAttachments(documentWithoutAttachments)).toBe(false)
  })
})
