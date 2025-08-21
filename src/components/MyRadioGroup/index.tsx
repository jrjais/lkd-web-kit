import { Radio, RadioGroupProps, RadioProps, Stack, Group, MantineSpacing } from '@mantine/core';

export interface MyRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  options: RadioProps[];
  orientation?: 'horizontal' | 'vertical';
  gap?: MantineSpacing;
  disabled?: boolean;
}

export const MyRadioGroup = ({
  options,
  orientation = 'horizontal',
  gap = 'xs',
  ...radioGroupProps
}: MyRadioGroupProps) => {
  const Container = orientation === 'horizontal' ? Group : Stack;
  return (
    <Radio.Group {...radioGroupProps}>
      <Container gap={gap}>
        {options.map((option, index) => (
          <Radio
            key={String(option.value) || String(index)}
            disabled={radioGroupProps.disabled || option.disabled}
            {...option}
          />
        ))}
      </Container>
    </Radio.Group>
  );
};
