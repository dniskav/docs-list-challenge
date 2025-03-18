import { h } from '../../../../../core/fTree/jsxRuntime'
import { Dropdown } from '../Dropdown'

jest.mock('../../../../../core/fTree/hooks', () => {
  const actualHooks = jest.requireActual('../../../../../core/fTree/hooks')
  return {
    ...actualHooks,
    getCurrentFid: jest.fn(() => 'test_fid')
  }
})

describe('🔽 Dropdown Component', () => {
  let container: any
  let onSelectMock: jest.Mock

  beforeEach(() => {
    onSelectMock = jest.fn()

    // Simulación de renderizado del componente en un contenedor
    container = h(Dropdown, {
      options: ['Option 1', 'Option 2', 'Option 3'],
      placeholder: 'Select one...',
      onSelect: onSelectMock
    })
  })

  test('✅ Should render with default placeholder', () => {
    expect(container.props.placeholder).toBe('Select one...')
  })

  test('✅ Should open dropdown on click', () => {
    container.props.onClick()
    expect(container.isOpen).toBe(true)
  })

  test('✅ Should close dropdown when clicking outside', () => {
    container.props.onClick()
    container.props.onBlur({ target: { closest: () => null } })
    expect(container.isOpen).toBe(false)
  })

  test('✅ Should select an option and close dropdown', () => {
    container.props.onClick()
    container.props.onSelect('Option 2')
    expect(container.selectedOption).toBe('Option 2')
    expect(container.isOpen).toBe(false)
    expect(onSelectMock).toHaveBeenCalledWith('Option 2')
  })

  test('✅ Should keep the selected option visible after selection', () => {
    container.props.onSelect('Option 3')
    expect(container.selectedOption).toBe('Option 3')
  })
})
