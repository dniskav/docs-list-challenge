import { HttpDocumentRepository } from '../HttpDocumentRepository'
import { Document } from '../../domain/Document'

global.fetch = jest.fn()

describe('🌍 HttpDocumentRepository', () => {
  const mockDocument: Document = {
    ID: '123',
    CreatedAt: new Date('2023-01-01T12:00:00Z'),
    UpdatedAt: new Date('2023-02-01T12:00:00Z'),
    Title: 'Test Document',
    Attachments: ['file1.pdf', 'file2.pdf'],
    Contributors: [
      { ID: '1', Name: 'John Doe' },
      { ID: '2', Name: 'Jane Doe' }
    ],
    Version: '1.0.0'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('✅ getAll should fetch and return an array of documents', async () => {
    const mockApiResponse = [
      {
        ID: '123',
        CreatedAt: '2023-01-01T12:00:00Z',
        UpdatedAt: '2023-02-01T12:00:00Z',
        Title: 'Test Document',
        Attachments: ['file1.pdf', 'file2.pdf'],
        Contributors: [
          { ID: '1', Name: 'John Doe' },
          { ID: '2', Name: 'Jane Doe' }
        ],
        Version: '1.0.0'
      }
    ]

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockApiResponse)
    })

    const documents = await HttpDocumentRepository.getAll()

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/documents')
    expect(documents).toEqual([mockDocument])
  })

  test('✅ getById should fetch and return a single document', async () => {
    const mockApiResponse = {
      ID: '123',
      CreatedAt: '2023-01-01T12:00:00Z',
      UpdatedAt: '2023-02-01T12:00:00Z',
      Title: 'Test Document',
      Attachments: ['file1.pdf', 'file2.pdf'],
      Contributors: [
        { ID: '1', Name: 'John Doe' },
        { ID: '2', Name: 'Jane Doe' }
      ],
      Version: '1.0.0'
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockApiResponse)
    })

    const document = await HttpDocumentRepository.getById('123')

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/documents/123')
    expect(document).toEqual(mockDocument)
  })

  test('✅ getById should return null if document is not found', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    })

    const document = await HttpDocumentRepository.getById('999')

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/documents/999')
    expect(document).toBeNull()
  })
})
