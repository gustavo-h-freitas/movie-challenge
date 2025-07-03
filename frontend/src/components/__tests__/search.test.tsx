import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchInput } from '../search'

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon">Search</div>,
}))

describe('SearchInput', () => {
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default placeholder', () => {
    render(<SearchInput onSearch={mockOnSearch} />)

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchInput onSearch={mockOnSearch} placeholder="Custom placeholder" />)

    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('calls onSearch with debounced input', async () => {
    jest.useFakeTimers()

    render(<SearchInput onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'test query' } })

    // Should not call immediately
    expect(mockOnSearch).not.toHaveBeenCalled()

    // Fast forward time to trigger debounce
    jest.advanceTimersByTime(300)

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })

    jest.useRealTimers()
  })

  it('updates input value when user types', () => {
    render(<SearchInput onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(input).toHaveValue('new value')
  })

  it('applies custom className', () => {
    render(<SearchInput onSearch={mockOnSearch} className="custom-class" />)

    const container = screen.getByPlaceholderText('Search...').parentElement
    expect(container).toHaveClass('custom-class')
  })
}) 