'use client';
import {
  Combobox,
  ComboboxItem,
  ElementProps,
  Input,
  InputBase,
  InputBaseProps,
  ScrollArea,
  useCombobox,
} from '@mantine/core';
import { InfiniteData } from '@tanstack/react-query';
import { ReactNode, useRef } from 'react';
import { InfiniteQueryHookResult } from 'react-query-kit';
import { useFetchNextPageOnScroll } from '../../hooks/useFetchNextPageOnScroll';
import { InfinityLoader } from '../InfinityLoader';

export interface SelectInfinityProps
  extends InputBaseProps,
    ElementProps<'button', keyof InputBaseProps | 'value' | 'onChange'> {
  value?: string | null;
  onChange?: (value: string | null) => void;
  data?: ComboboxItem[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  renderOption?: (args: { option: ComboboxItem }) => React.ReactNode;
  onOptionSubmit?: (value: string) => void;
  nothingFoundMessage?: ReactNode;
  infinity: InfiniteQueryHookResult<InfiniteData<{ data: unknown[] }, number>, Error>;
  placeholder?: string;
}

export function SelectInfinity({
  value,
  onChange,
  data = [],
  searchValue,
  onSearchChange,
  renderOption,
  onOptionSubmit,
  nothingFoundMessage,
  infinity,
  placeholder,
  ...props
}: SelectInfinityProps) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      onSearchChange?.('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = data.map((i) => (
    <Combobox.Option
      value={i.value}
      key={i.value}
    >
      {renderOption ? renderOption({ option: i }) : i.label}
    </Combobox.Option>
  ));

  const selectedOption = data.find((i) => i.value === value);

  const scrollRef = useRef<HTMLDivElement>(null);

  useFetchNextPageOnScroll({ infinity, scrollRef });

  return (
    <Combobox
      store={combobox}
      middlewares={{
        shift: {
          crossAxis: true,
        },
      }}
      onOptionSubmit={(val) => {
        onChange?.(val);
        onOptionSubmit?.(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          {...props}
        >
          {selectedOption?.label || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Search
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.currentTarget.value)}
          placeholder="Escribe para buscar"
        />
        <Combobox.Options>
          <ScrollArea.Autosize
            mah={200}
            type="scroll"
            viewportRef={scrollRef}
          >
            {options.length > 0 ? (
              options
            ) : !infinity.isFetching ? (
              <Combobox.Empty
                onClick={() => combobox.closeDropdown()}
                className="min-h-6"
              >
                {nothingFoundMessage ?? 'Sin resultados'}
              </Combobox.Empty>
            ) : null}
            <InfinityLoader
              className="text-sm"
              infinity={infinity}
              loaderProps={{
                size: 'sm',
                className: 'mt-1 mb-2',
              }}
            />
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
