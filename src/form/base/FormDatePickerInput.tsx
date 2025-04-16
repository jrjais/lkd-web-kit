import { MyDatePickerInput, MyDatePickerInputProps } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormDatePickerInput = WithFormProps & MyDatePickerInputProps;

export const FormDatePickerInput = withForm<MyDatePickerInputProps>(({ field, props }) => (
  <MyDatePickerInput
    {...field}
    {...props}
  />
));
