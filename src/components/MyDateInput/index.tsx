import { DateInput, DateInputProps } from '@mantine/dates';
import CalendarIcon from '../MyDatePickerInput/CalendarIcon';

export interface MyDateInputProps extends DateInputProps {}

export const MyDateInput = (props: MyDateInputProps) => (
  <DateInput
    leftSection={<CalendarIcon size={props.size} />}
    leftSectionPointerEvents="none"
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
