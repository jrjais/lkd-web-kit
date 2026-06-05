import { MyCheckboxGroup, MyCheckboxGroupProps } from 'src/components/MyCheckboxGroup'
import { WithControllerProps, withController } from 'src/hocs'

export type FormCheckboxGroupProps = MyCheckboxGroupProps & WithControllerProps

export const FormCheckboxGroup = withController<FormCheckboxGroupProps>(({ field, props }) => (
  <MyCheckboxGroup {...field} {...props} />
))
