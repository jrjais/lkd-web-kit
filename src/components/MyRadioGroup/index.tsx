import { Radio, RadioGroupProps, RadioProps, Stack, Group, MantineSpacing } from '@mantine/core';

export interface MyRadioGroupProps extends RadioGroupProps {
  options: RadioProps[];
  orientation?: 'horizontal' | 'vertical';
  gap?: MantineSpacing;
}

export const MyRadioGroup = ({
  options,
  orientation = 'vertical',
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
            disabled={radioGroupProps.readOnly}
            {...option}
          />
        ))}
      </Container>
    </Radio.Group>
  );
};
