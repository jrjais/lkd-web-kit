import {
  DateTimePicker,
  DateTimePickerProps,
  MonthPickerInput,
  MonthPickerInputProps,
} from '@mantine/dates';
import CalendarIcon from '../MyDatePickerInput/CalendarIcon';

export interface MyMonthPickerInputProps extends MonthPickerInputProps<any> {}

export const MyMonthPickerInput = (props: MyMonthPickerInputProps) => (
  <MonthPickerInput
    leftSection={<CalendarIcon size={props.size} />}
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
