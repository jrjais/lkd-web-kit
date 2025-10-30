import { TextInput } from '@mantine/core';
import { TimeInputProps } from '@mantine/dates';

export interface MyTimeInputProps extends TimeInputProps {
  ref?: React.Ref<HTMLInputElement>;
}

export const MyTimeInput = (props: MyTimeInputProps) => (
  <TextInput
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
