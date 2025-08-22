'use client';
import {
  Combobox,
  ComboboxProps,
  ComboboxStore,
  ElementProps,
  Input,
  InputBase,
  InputBaseProps,
  useCombobox,
} from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { InfiniteData } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { InfiniteQueryHookResult } from 'react-query-kit';
import { getVirtualContainerProps, getVirtualItemProps } from 'src/utils/virtual-styles';
import { InfinityLoader } from '../InfinityLoader';

export interface InfinitySelectProps<T = unknown>
  extends InputBaseProps,
    ElementProps<'input', keyof InputBaseProps | 'value' | 'onChange'> {
  value?: string | null;
  defaultValue?: string;
  searchValue?: string;
  defaultSearchValue?: string;
  nothingFoundMessage?: ReactNode | ((data: { combobox: ComboboxStore }) => ReactNode);
  infinity: InfiniteQueryHookResult<InfiniteData<{ data: T[] }, number>, Error>;
  defaultSelectedOption?: T | null;
  selectedOption?: T | null;
  onSelectedOptionChange?: (option: T | null) => void;
  onSearchChange?: (value: string) => void;
  onChange?: (value: string | null) => void;
  renderOption?: (args: { option: T }) => React.ReactNode;
  onOptionSubmit?: (value: string, option: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  comboboxProps?: ComboboxProps;
  searchable?: boolean;
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
  ...props
}: InfinitySelectProps<T>) {
  const combobox = useCombobox();

  const [_selectedOption, handleSelectedOption] = useUncontrolled({
    defaultValue: defaultSelectedOption,
    value: selectedOption,
    onChange: onSelectedOptionChange,
  });

  const [_value, handleValue] = useUncontrolled({
    defaultValue,
    value,
    onChange,
  });

  const [_search, handleSearch] = useUncontrolled({
    defaultValue: defaultSearchValue,
    value: searchValue,
    onChange: onSearchChange,
  });

  const data = infinity.data?.pages.flatMap((page) => page.data) ?? [];

  const _reset = () => {
    handleSearch('');
    handleValue(null);
    handleSelectedOption(null);
  };

  const setSearchAndValue = (option: T | null) => {
    if (option === null) _reset();
    else {
      handleSearch(getOptionLabel(option));
      handleValue(getOptionValue(option));
    }
  };

  useEffect(() => {
    setSearchAndValue(_selectedOption);
  }, [_selectedOption]);

  const virtualizer = useVirtualizer({
    count: data.length,
    estimateSize: () => 40,
    overscan: 7,
    getScrollElement: () => scrollRef.current,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Combobox
      store={combobox}
      middlewares={{
        shift: {
          crossAxis: true,
        },
      }}
      onOptionSubmit={(val) => {
        const selectedOption = data.find((i) => getOptionValue(i) === val);
        if (selectedOption) {
          setSearchAndValue(selectedOption);
          handleSelectedOption(selectedOption);
          onOptionSubmit?.(val, selectedOption);
        }
        combobox.closeDropdown();
      }}
      {...comboboxProps}
    >
      <Combobox.Target>
        <InputBase
          rightSection={
            props.readOnly ? null : value ? (
              <Input.ClearButton onClick={_reset} />
            ) : (
              <Combobox.Chevron />
            )
          }
          component={'input'}
          rightSectionPointerEvents={value ? undefined : 'none'}
          readOnly={!searchable || props.readOnly}
          pointer={!searchable}
          value={searchable ? _search : _selectedOption ? getOptionLabel(_selectedOption) : ''}
          onChange={
            searchable
              ? (event) => {
                  if (event.currentTarget.value) combobox.openDropdown();
                  else combobox.closeDropdown();
                  // setSearchHasChanged(true);
                  handleSearch(event.currentTarget.value);
                }
              : undefined
          }
          onClick={(event) => {
            if (!props.readOnly) searchable ? combobox.openDropdown() : combobox.toggleDropdown();
            props.onClick?.(event);
          }}
          onFocus={(event) => {
            if (!props.readOnly && searchable) combobox.openDropdown();
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            if (_selectedOption) setSearchAndValue(_selectedOption);
            if (searchable) combobox.closeDropdown();
            props.onBlur?.(event);
            // setSearchHasChanged(false);
          }}
          {...props}
          variant={props.readOnly ? 'filled' : 'default'}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options
          mah={200}
          style={{
            overflowY: 'auto',
          }}
          ref={scrollRef}
        >
          {data.length > 0 ? (
            <div {...getVirtualContainerProps(virtualizer)}>
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const option = data[virtualItem.index];
                const virtualItemProps = getVirtualItemProps(virtualItem, virtualizer);
                return (
                  <Combobox.Option
                    value={getOptionValue(option)}
                    {...virtualItemProps}
                    key={virtualItemProps.key}
                    style={{
                      ...virtualItemProps.style,
                      fontWeight: 400,
                    }}
                  >
                    {renderOption ? renderOption({ option }) : getOptionLabel(option)}
                  </Combobox.Option>
                );
              })}
            </div>
          ) : !infinity.isFetching ? (
            <Combobox.Empty mih={24}>
              {nothingFoundMessage
                ? typeof nothingFoundMessage === 'function'
                  ? nothingFoundMessage({ combobox })
                  : nothingFoundMessage
                : 'No hay resultados'}
            </Combobox.Empty>
          ) : null}
          <InfinityLoader
            root={scrollRef}
            infinity={infinity}
            loaderProps={{
              mt: 4,
              mb: 8,
              size: 'sm',
            }}
          />
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
