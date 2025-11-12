import { NumberInput, NumberInputProps } from '@mantine/core';

export interface MyNumberInputProps extends Omit<NumberInputProps, "onValueChange"> {
  ref?: React.Ref<HTMLInputElement>;
}

export const MyNumberInput = (props: MyNumberInputProps) => (
  <NumberInput
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
