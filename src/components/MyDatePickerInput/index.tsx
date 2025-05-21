import { DatePickerInputProps, DatePickerInput } from '@mantine/dates';
import CalendarIcon from './CalendarIcon';

export interface MyDatePickerInputProps extends DatePickerInputProps<any> {}

export const MyDatePickerInput = (props: MyDatePickerInputProps) => (
  <DatePickerInput
    leftSection={<CalendarIcon size={props.size} />}
    leftSectionPointerEvents="none"
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
