import { TextInput, TextInputProps } from '@mantine/core';

export interface MyTextInputProps extends TextInputProps {}

export const MyTextInput = (props: MyTextInputProps) => (
  <TextInput
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
