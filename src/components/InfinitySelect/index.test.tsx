import { MantineProvider } from '@mantine/core'
import type { InfiniteData } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import type { ComponentProps } from 'react'
import type { InfiniteQueryHookResult } from 'react-query-kit'
import { describe, expect, it, vi } from 'vitest'
import { InfinitySelect } from '.'

type Option = {
  id: string
  label: string
}

const getInfinity = (
  data: Option[],
): InfiniteQueryHookResult<InfiniteData<{ data?: Option[] }, number>, Error> =>
  ({
    data: {
      pageParams: [0],
      pages: [{ data }],
    },
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    isFetching: false,
    isFetchingNextPage: false,
    isLoading: false,
  }) as unknown as InfiniteQueryHookResult<InfiniteData<{ data?: Option[] }, number>, Error>

const renderInfinitySelect = (props?: Partial<ComponentProps<typeof InfinitySelect<Option>>>) => {
  const option = { id: '1', label: 'Campaña activa' }

  return render(
    <MantineProvider>
      <InfinitySelect
        infinity={getInfinity([option])}
        getOptionLabel={(item) => item.label}
        getOptionValue={(item) => item.id}
        placeholder="Seleccionar"
        {...props}
      />
    </MantineProvider>,
  )
}

describe('InfinitySelect', () => {
  it('mantiene el input readonly cuando searchable es false', () => {
    renderInfinitySelect({
      readOnly: false,
      searchable: false,
    })

    expect(screen.getByPlaceholderText('Seleccionar')).toHaveAttribute('readonly')
  })
})
