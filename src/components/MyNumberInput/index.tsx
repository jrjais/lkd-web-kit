import { NumberInput, NumberInputProps } from '@mantine/core';

export interface MyNumberInputProps extends NumberInputProps {
  ref?: React.Ref<HTMLInputElement>;
}

export const MyNumberInput = (props: MyNumberInputProps) => (
  <NumberInput
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
