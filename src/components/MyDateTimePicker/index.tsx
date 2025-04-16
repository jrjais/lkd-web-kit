import { DateTimePicker, DateTimePickerProps } from '@mantine/dates';
import CalendarIcon from '../MyDatePickerInput/CalendarIcon';

export interface MyDateTimePickerProps extends DateTimePickerProps {}

export const MyDateTimePicker = (props: MyDateTimePickerProps) => (
  <DateTimePicker
    leftSection={<CalendarIcon size={props.size} />}
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
