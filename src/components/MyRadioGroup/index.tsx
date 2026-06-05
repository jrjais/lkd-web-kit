import { Group, MantineSpacing, Radio, RadioGroupProps, RadioProps, Stack } from '@mantine/core'
import { FormRadioGroup } from 'src/form'

export interface MyRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  options: RadioProps[]
  orientation?: 'horizontal' | 'vertical'
  gap?: MantineSpacing
  disabled?: boolean
}

export const MyRadioGroup = ({
  options,
  orientation = 'horizontal',
  gap = 'md',
  ...radioGroupProps
}: MyRadioGroupProps) => {
  const Container = orientation === 'horizontal' ? Group : Stack
  return (
    <Radio.Group {...radioGroupProps}>
      <Container gap={gap}>
        {options.map((option, index) => (
          <Radio key={String(option.value) || String(index)} {...option} />
        ))}
      </Container>
    </Radio.Group>
  )
}
