const {
  getCurrentFid,
  setCurrentFid,
  getHookIndex,
  incHookIndex,
  getHooksContext
} = require('../hooksContext')

describe('🪝 hooksContext', () => {
  beforeEach(() => {
    // Reset state before each test
    setCurrentFid(null)
  })

  test('Should return null when there is no Fiber ID', () => {
    expect(getCurrentFid()).toBeNull()
  })

  test('Should set and retrieve the Fiber ID', () => {
    setCurrentFid('fid_123')
    expect(getCurrentFid()).toBe('fid_123')
  })

  test('Should remove the last Fiber ID when null is passed', () => {
    setCurrentFid('fid_456')
    expect(getCurrentFid()).toBe('fid_456')

    setCurrentFid(null)
    expect(getCurrentFid()).toBeNull()
  })

  test('hookIndex should start at 0 and increment correctly', () => {
    expect(getHookIndex()).toBe(0)
    incHookIndex()
    expect(getHookIndex()).toBe(1)
    incHookIndex()
    expect(getHookIndex()).toBe(2)
  })

  test('hookIndex should reset when changing the Fiber ID', () => {
    incHookIndex()
    incHookIndex()
    expect(getHookIndex()).toBe(2)

    setCurrentFid('fid_789')
    expect(getHookIndex()).toBe(0)
  })

  test('Should return the correct hooks context', () => {
    setCurrentFid('fid_321')
    const context = getHooksContext()

    expect(context).toHaveProperty('currentFid', 'fid_321')
    expect(context).toHaveProperty('hooksContext')
  })
})
