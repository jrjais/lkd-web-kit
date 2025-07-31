import { TimeInputProps } from '@mantine/dates';
import { MyTimeInputProps, MyTimeInput } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormTimeInput = MyTimeInputProps & WithFormProps;

export const FormTimeInput = withController<TimeInputProps>(({ field, props }) => (
  <MyTimeInput
    {...field}
    {...props}
  />
));

export const timeInputToNumber = (timeInput: string) => {
  const [hours, minutes] = timeInput.split(':').map(Number);
  const result = hours + minutes / 60;
  return Number(result.toFixed(2));
};

export const numberToTimeInput = (number: number) => {
  const hours = Math.floor(number);
  const minutes = Math.round((number - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
