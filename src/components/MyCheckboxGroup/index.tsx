import { Radio, RadioProps, Stack, Group, MantineSpacing, CheckboxGroupProps, CheckboxGroup, CheckboxProps, Checkbox } from '@mantine/core';

export interface MyCheckboxGroupProps extends Omit<CheckboxGroupProps, 'children'> {
  options: CheckboxProps[];
  orientation?: 'horizontal' | 'vertical';
  gap?: MantineSpacing;
  disabled?: boolean;
}

export const MyCheckboxGroup = ({
  options,
  orientation = 'horizontal',
  gap = 'md',
  ...checkboxGroupProps
}: MyCheckboxGroupProps) => {
  const Container = orientation === 'horizontal' ? Group : Stack;
  return (
    <CheckboxGroup {...checkboxGroupProps}>
      <Container gap={gap}>
        {options.map((option, index) => (
          <Checkbox
            key={String(option.value) || String(index)}
            {...option}
          />
        ))}
      </Container>
    </CheckboxGroup>
  );
};
