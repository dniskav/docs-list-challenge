import { DocumentRepository } from '../../infrastructure'
import { documentService } from '../DocumentService'
const mockRepository: jest.Mocked<DocumentRepository> = {
  getAll: jest.fn(),
  getById: jest.fn()
}

const mockDocuments = [
  {
    ID: '1',
    Title: 'Test Document 1',
    Version: '1.0',
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    Attachments: [],
    Contributors: []
  },
  {
    ID: '2',
    Title: 'Test Document 2',
    Version: '2.0',
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
    Attachments: [],
    Contributors: []
  }
]

describe('\ud83d\udd04 DocumentService', () => {
  const service = documentService(mockRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should fetch all documents', async () => {
    mockRepository.getAll.mockResolvedValue(mockDocuments)

    const result = await service.listDocuments()
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockDocuments)
  })

  test('Should fetch a document by ID', async () => {
    const mockDocument = mockDocuments[0]
    mockRepository.getById.mockResolvedValue(mockDocument)

    const result = await service.findDocumentById('1')
    expect(mockRepository.getById).toHaveBeenCalledWith('1')
    expect(result).toEqual(mockDocument)
  })

  test('Should return null if document is not found', async () => {
    mockRepository.getById.mockResolvedValue(null)

    const result = await service.findDocumentById('nonexistent')
    expect(mockRepository.getById).toHaveBeenCalledWith('nonexistent')
    expect(result).toBeNull()
  })
})
