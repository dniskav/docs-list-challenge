import { useRef } from '../useRef'

describe('🪝 useRef Hook', () => {
  test('should return an object with a current property', () => {
    const ref = useRef<string>('initial value')
    expect(ref).toHaveProperty('current', 'initial value')
  })

  test('should allow updating the current property', () => {
    const ref = useRef<number>(42)
    ref.current = 100
    expect(ref.current).toBe(100)
  })

  test('should initialize with undefined if no value is provided', () => {
    const ref = useRef()
    expect(ref.current).toBeUndefined()
  })
})
