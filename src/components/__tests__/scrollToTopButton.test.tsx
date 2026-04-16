import { fireEvent, render, screen } from '@testing-library/react'
import { ScrollToTopButton } from 'src/components/ScrollToTopButton'
import { describe, expect, it, vi } from 'vitest'

describe('ScrollToTopButton', () => {
  it('renders only after threshold is reached and scrolls to top on click', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true })
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const { queryByRole } = render(<ScrollToTopButton threshold={400} label="Go up" />)

    expect(queryByRole('button', { name: 'Go up' })).toBeNull()

    Object.defineProperty(window, 'scrollY', { value: 500, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByRole('button', { name: 'Go up' })
    fireEvent.click(button)

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })

    scrollToSpy.mockRestore()
  })
})
