import { DateTimePickerProps } from '@mantine/dates';
import { MyDateTimePickerProps, MyDateTimePicker } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormDateTimePickerProps = WithFormProps & MyDateTimePickerProps;

export const FormDateTimePicker = withForm<DateTimePickerProps>(({ field, props }) => (
  <MyDateTimePicker
    {...field}
    {...props}
  />
));
