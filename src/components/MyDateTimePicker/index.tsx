import { DateTimePicker, DateTimePickerProps } from '@mantine/dates';
import CalendarIcon from '../MyDatePickerInput/CalendarIcon';

export interface MyDateTimePickerProps extends DateTimePickerProps {
  ref: React.Ref<HTMLButtonElement>;
}

export const MyDateTimePicker = (props: MyDateTimePickerProps) => (
  <DateTimePicker
    leftSection={<CalendarIcon size={props.size} />}
    leftSectionPointerEvents="none"
    variant={props.readOnly ? 'filled' : 'default'}
    {...props}
  />
);
