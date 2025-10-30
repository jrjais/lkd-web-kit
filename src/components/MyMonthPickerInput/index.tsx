import {
  DateTimePicker,
  DateTimePickerProps,
  MonthPickerInput,
  MonthPickerInputProps,
} from '@mantine/dates';
import CalendarIcon from '../MyDatePickerInput/CalendarIcon';

export interface MyMonthPickerInputProps extends MonthPickerInputProps<any> {
  ref: React.Ref<HTMLButtonElement>;
}

export const MyMonthPickerInput = (props: MyMonthPickerInputProps) => (
  <MonthPickerInput
    leftSection={<CalendarIcon size={props.size} />}
    leftSectionPointerEvents="none"
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
