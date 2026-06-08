'use client'
import {
  Center,
  Combobox,
  type ComboboxProps,
  type ComboboxStore,
  type ElementProps,
  Input,
  InputBase,
  type InputBaseProps,
  useVirtualizedCombobox,
} from '@mantine/core'
import { useUncontrolled } from '@mantine/hooks'
import type { InfiniteData } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import type { InfiniteQueryHookResult } from 'react-query-kit'
import { getVirtualContainerProps, getVirtualItemProps } from 'src/utils/virtual-styles'
import { InfinityLoadMoreButton, type InfinityLoadMoreButtonProps } from '../InfinityLoadMoreButton'

const OPTION_HEIGHT = 40

export interface InfinitySelectProps<T = unknown>
  extends InputBaseProps,
    ElementProps<'input', keyof InputBaseProps | 'value' | 'onChange'> {
  value?: string | null
  defaultValue?: string
  searchValue?: string
  defaultSearchValue?: string
  nothingFoundMessage?: ReactNode | ((data: { combobox: ComboboxStore }) => ReactNode)
  infinity: InfiniteQueryHookResult<InfiniteData<{ data?: T[] }, number>, Error>
  defaultSelectedOption?: T | null
  selectedOption?: T | null
  onSelectedOptionChange?: (option: T | null) => void
  onSearchChange?: (value: string) => void
  onChange?: (value: string | null) => void
  renderOption?: (args: { option: T }) => React.ReactNode
  onOptionSubmit?: (value: string, option: T) => void
  getOptionLabel: (option: T) => string
  getOptionValue: (option: T) => string
  resetPageParam?: () => Promise<void>
  comboboxProps?: ComboboxProps
  searchable?: boolean
  ref?: React.Ref<HTMLInputElement>
  loadMoreButtonProps?: Partial<InfinityLoadMoreButtonProps<T>>
}

export function InfinitySelect<T = unknown>({
  value,
  searchValue,
  defaultSearchValue,
  nothingFoundMessage,
  infinity,
  defaultValue,
  onChange,
  onSearchChange,
  renderOption,
  onOptionSubmit,
  getOptionLabel,
  getOptionValue,
  onSelectedOptionChange,
  selectedOption,
  comboboxProps,
  searchable = true,
  defaultSelectedOption = null,
  loadMoreButtonProps,
  resetPageParam,
  readOnly,
  ...props
}: InfinitySelectProps<T>) {
  const isReadOnly = !searchable || readOnly

  const [_selectedOption, handleSelectedOption] = useUncontrolled({
    defaultValue: defaultSelectedOption,
    value: selectedOption,
    onChange: onSelectedOptionChange,
  })

  const [_value, handleValue] = useUncontrolled({
    defaultValue,
    value,
    onChange,
  })

  const [_search, handleSearch] = useUncontrolled({
    defaultValue: defaultSearchValue,
    value: searchValue,
    onChange: onSearchChange,
  })

  const data = useMemo(
    () => infinity.data?.pages.flatMap((page) => page.data ?? []) ?? [],
    [infinity.data],
  )

  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1)
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1)

  const resetSelection = (options?: { resetPage?: boolean }) => {
    handleSearch('')
    handleValue(null)
    handleSelectedOption(null)
    setActiveOptionIndex(-1)
    setSelectedOptionIndex(-1)

    if (options?.resetPage) {
      void resetPageParam?.()
    }
  }

  const _reset = () => {
    resetSelection({ resetPage: true })
  }

  const setSearchAndValue = (option: T | null) => {
    if (option === null) resetSelection()
    else {
      handleSearch(getOptionLabel(option))
      handleValue(getOptionValue(option))
    }
  }

  useEffect(() => {
    setSearchAndValue(_selectedOption)
  }, [_selectedOption])

  const virtualizer = useVirtualizer({
    count: data.length,
    estimateSize: () => OPTION_HEIGHT,
    getItemKey: (index) => getOptionValue(data[index]),
    overscan: 7,
    getScrollElement: () => scrollRef.current,
  })

  const combobox = useVirtualizedCombobox({
    onDropdownOpen: () => {
      if (activeOptionIndex >= 0 && activeOptionIndex < data.length) {
        setSelectedOptionIndex(activeOptionIndex)
        requestAnimationFrame(() => {
          virtualizer.scrollToIndex(activeOptionIndex, { align: 'auto' })
        })
      } else {
        setSelectedOptionIndex(-1)
      }
    },
    onDropdownClose: () => setSelectedOptionIndex(-1),
    totalOptionsCount: data.length,
    isOptionDisabled: (index) => index < 0 || index >= data.length,
    getOptionId: (index) => {
      return index >= 0 && index < data.length ? getOptionValue(data[index]) : null
    },
    selectedOptionIndex,
    activeOptionIndex,
    setSelectedOptionIndex: (index) => {
      setSelectedOptionIndex(index)

      if (index !== -1) {
        virtualizer.scrollToIndex(index, { align: 'auto' })
      }
    },
    onSelectedOptionSubmit: handleOptionSubmit,
  })

  useEffect(() => {
    const nextActiveOptionIndex = _value
      ? data.findIndex((option) => getOptionValue(option) === _value)
      : -1

    setActiveOptionIndex(nextActiveOptionIndex)
  }, [_value, data, getOptionValue])

  useEffect(() => {
    setSelectedOptionIndex(-1)
    scrollRef.current?.scrollTo({ top: 0 })
  }, [_search])

  useEffect(() => {
    if (selectedOptionIndex >= data.length) {
      setSelectedOptionIndex(-1)
    }
  }, [selectedOptionIndex, data.length])

  function handleOptionSubmit(index: number) {
    if (index < 0 || index >= data.length) return

    const selectedOption = data[index]
    const selectedValue = getOptionValue(selectedOption)

    setSearchAndValue(selectedOption)
    handleSelectedOption(selectedOption)
    setActiveOptionIndex(index)
    onOptionSubmit?.(selectedValue, selectedOption)
    combobox.closeDropdown()
    combobox.resetSelectedOption()
  }

  return (
    <Combobox
      store={combobox}
      middlewares={{
        shift: {
          crossAxis: true,
        },
      }}
      resetSelectionOnOptionHover={false}
      keepMounted
      {...comboboxProps}
    >
      <Combobox.Target>
        <InputBase
          rightSection={
            readOnly ? null : _value ? <Input.ClearButton onClick={_reset} /> : <Combobox.Chevron />
          }
          component={'input'}
          rightSectionPointerEvents={_value ? undefined : 'none'}
          readOnly={isReadOnly}
          pointer={!searchable}
          value={searchable ? _search : _selectedOption ? getOptionLabel(_selectedOption) : ''}
          onChange={
            searchable
              ? (event) => {
                  if (event.currentTarget.value) combobox.openDropdown()
                  else combobox.closeDropdown()
                  // setSearchHasChanged(true);
                  setSelectedOptionIndex(-1)
                  handleSearch(event.currentTarget.value)
                  void resetPageParam?.()
                }
              : undefined
          }
          onClick={(event) => {
            if (!readOnly) searchable ? combobox.openDropdown() : combobox.toggleDropdown()
            props.onClick?.(event)
          }}
          onFocus={(event) => {
            if (!readOnly && searchable) combobox.openDropdown()
            props.onFocus?.(event)
          }}
          onBlur={(event) => {
            if (_selectedOption) setSearchAndValue(_selectedOption)
            if (searchable) combobox.closeDropdown()
            props.onBlur?.(event)
            // setSearchHasChanged(false);
          }}
          {...props}
          variant={readOnly ? 'filled' : 'default'}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options
          mih={50}
          mah={200}
          style={{
            overflowY: 'auto',
          }}
          ref={scrollRef}
        >
          {data.length > 0 ? (
            <>
              <div {...getVirtualContainerProps(virtualizer)}>
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const option = data[virtualItem.index]
                  const virtualItemProps = getVirtualItemProps(virtualItem, virtualizer)

                  return (
                    <Combobox.Option
                      value={getOptionValue(option)}
                      {...virtualItemProps}
                      active={virtualItem.index === activeOptionIndex}
                      selected={virtualItem.index === selectedOptionIndex}
                      onClick={() => handleOptionSubmit(virtualItem.index)}
                      key={virtualItemProps.key}
                      style={{
                        ...virtualItemProps.style,
                        fontWeight: 400,
                      }}
                    >
                      {renderOption ? renderOption({ option }) : getOptionLabel(option)}
                    </Combobox.Option>
                  )
                })}
              </div>
              {virtualizer.getTotalSize() !== 0 && (
                <Center className="mt-2">
                  <InfinityLoadMoreButton
                    infinity={infinity}
                    parentRef={scrollRef}
                    size="compact-sm"
                    {...loadMoreButtonProps}
                  />
                </Center>
              )}
            </>
          ) : !infinity.isFetching ? (
            <Combobox.Empty mih={24}>
              {nothingFoundMessage
                ? typeof nothingFoundMessage === 'function'
                  ? nothingFoundMessage({ combobox })
                  : nothingFoundMessage
                : 'No hay resultados'}
            </Combobox.Empty>
          ) : null}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
