import { Button, type ButtonProps } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import type { InfiniteData } from '@tanstack/react-query'
import clsx from 'clsx'
import { type RefObject, useEffect } from 'react'
import type { InfiniteQueryHookResult } from 'react-query-kit'

export interface InfinityLoadMoreButtonProps<T> extends ButtonProps {
  infinity: InfiniteQueryHookResult<InfiniteData<{ data?: T[] }, number>, Error>
  parentRef?: RefObject<HTMLElement | null>
  loader?: React.ReactNode
  labels?: {
    loadMore?: string
    end?: string
  }
}

export const InfinityLoadMoreButton = <T,>({
  infinity,
  labels,
  parentRef,
  loader,
  ...props
}: InfinityLoadMoreButtonProps<T>) => {
  const { entry, ref } = useIntersection({
    root: parentRef?.current,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5,
  })

  const { loadMore = 'Cargar más', end = 'Fin de la lista' } = labels || {}

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = infinity

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && entry?.isIntersecting) fetchNextPage()
  }, [entry?.isIntersecting])

  const showLoader = infinity.isLoading || infinity.isFetchingNextPage

  return (
    <Button
      ref={ref}
      onClick={() => fetchNextPage()}
      loading={showLoader}
      className={clsx(!hasNextPage && 'pointer-events-none', 'font-medium')}
      variant="transparent"
      color={!hasNextPage ? 'gray' : undefined}
      {...props}
    >
      {hasNextPage ? loadMore : end}
    </Button>
  )
}
