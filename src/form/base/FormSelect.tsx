import { MyMultiSelect, MySelect, MySelectProps } from 'src/components'
import { WithControllerProps, withController } from 'src/hocs'

export type FormSelectProps = MySelectProps & WithControllerProps

export const FormSelect = withController<FormSelectProps>(({ field, props }) => (
  <MySelect {...field} {...props} />
))
