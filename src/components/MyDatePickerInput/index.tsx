import { DatePickerInputProps, DatePickerInput } from '@mantine/dates';
import CalendarIcon from './CalendarIcon';

export interface MyDatePickerInputProps extends DatePickerInputProps<any> {
  ref: React.Ref<HTMLButtonElement>;
}

export const MyDatePickerInput = (props: MyDatePickerInputProps) => (
  <DatePickerInput
    leftSection={<CalendarIcon size={props.size} />}
    leftSectionPointerEvents="none"
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
