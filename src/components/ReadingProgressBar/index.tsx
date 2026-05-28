'use client'

import { useEffect, useState } from 'react'

const getDocumentScrollProgress = () => {
  const scrollTop = window.scrollY
  const maxScroll = document.body.scrollHeight - window.innerHeight

  if (maxScroll <= 0) {
    return 0
  }

  return Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100))
}

export interface ReadingProgressBarProps {
  containerClassName?: string
  progressClassName?: string
}

export const ReadingProgressBar = ({
  containerClassName = 'fixed top-0 left-0 z-50 h-1 w-full bg-grey-1',
  progressClassName = 'h-full bg-blue-6 transition-[width] duration-150',
}: ReadingProgressBarProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setProgress(getDocumentScrollProgress())
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={containerClassName}>
      <div className={progressClassName} style={{ width: `${progress}%` }} />
    </div>
  )
}
