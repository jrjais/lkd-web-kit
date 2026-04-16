'use client'

import { useEffect, useState } from 'react'

export interface ScrollToTopButtonProps {
  threshold?: number
  label?: string
  className?: string
}

export const ScrollToTopButton = ({
  threshold = 400,
  label = 'Volver arriba',
  className = 'fixed bottom-6 right-6 z-40 rounded-full bg-blue-6 px-4 py-2 font-semibold text-sm text-white shadow-lg hover:bg-blue-7',
}: ScrollToTopButtonProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={className}
    >
      {label}
    </button>
  )
}
