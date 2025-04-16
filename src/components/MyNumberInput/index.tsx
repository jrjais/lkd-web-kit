import { NumberInput, NumberInputProps } from '@mantine/core';

export interface MyNumberInputProps extends NumberInputProps {}

export const MyNumberInput = (props: MyNumberInputProps) => (
  <NumberInput
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
