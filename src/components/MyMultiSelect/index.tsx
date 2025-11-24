import { MultiSelect, MultiSelectProps, SelectProps } from '@mantine/core'

export interface MyMultiSelectProps extends MultiSelectProps {
  ref?: React.Ref<HTMLInputElement>
}

export const MyMultiSelect = (props: MyMultiSelectProps) => (
  <MultiSelect variant={props.readOnly ? 'filled' : 'default'} {...props} />
)
