import { Radio, RadioGroupProps } from '@mantine/core'
import { MyRadioGroup, MyRadioGroupProps } from 'src/components'
import { WithControllerProps, withController } from 'src/hocs'

export type FormRadioGroupProps = MyRadioGroupProps & WithControllerProps

export const FormRadioGroup = withController<FormRadioGroupProps>(({ field, props }) => (
  <MyRadioGroup {...field} {...props} />
))
