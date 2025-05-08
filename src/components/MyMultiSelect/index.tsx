import { SelectProps, MultiSelect, MultiSelectProps } from '@mantine/core';

export interface MyMultiSelectProps extends MultiSelectProps {}

export const MyMultiSelect = (props: MyMultiSelectProps) => (
  <MultiSelect
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
