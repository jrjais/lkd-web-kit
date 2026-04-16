import { render } from '@testing-library/react'
import { ReadingProgressBar } from 'src/components/ReadingProgressBar'
import { describe, expect, it } from 'vitest'

describe('ReadingProgressBar', () => {
  it('updates progress width when scrolling', () => {
    Object.defineProperty(document.body, 'scrollHeight', {
      value: 2000,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
    })
    Object.defineProperty(window, 'scrollY', {
      value: 500,
      writable: true,
      configurable: true,
    })

    const { container } = render(<ReadingProgressBar />)

    const progressDiv = container.querySelector('[style]') as HTMLDivElement
    expect(progressDiv.style.width).toBe('50%')
  })
})
