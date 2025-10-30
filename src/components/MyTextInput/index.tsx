import { TextInput, TextInputProps } from '@mantine/core';

export interface MyTextInputProps extends TextInputProps {
  ref?: React.Ref<HTMLInputElement>;
}

export const MyTextInput = (props: MyTextInputProps) => (
  <TextInput
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
