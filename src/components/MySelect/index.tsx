import { Select, SelectProps } from '@mantine/core';

export interface MySelectProps extends SelectProps {
  ref: React.Ref<HTMLInputElement>;
}

export const MySelect = (props: MySelectProps) => (
  <Select
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
