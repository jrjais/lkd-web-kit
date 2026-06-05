import { DateTimePickerProps } from '@mantine/dates'
import { MyDateTimePicker, MyDateTimePickerProps } from 'src/components'
import { WithControllerProps, withController } from 'src/hocs'

export type FormDateTimePickerProps = WithControllerProps & MyDateTimePickerProps

export const FormDateTimePicker = withController<DateTimePickerProps>(({ field, props }) => (
  <MyDateTimePicker {...field} {...props} />
))
