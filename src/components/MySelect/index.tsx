import { Select, SelectProps } from '@mantine/core';

export interface MySelectProps extends SelectProps {}

export const MySelect = (props: MySelectProps) => (
  <Select
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
