import { MyDatePickerInput, MyDatePickerInputProps } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormDatePickerInputProps = WithFormProps & MyDatePickerInputProps;

export const FormDatePickerInput = withForm<FormDatePickerInputProps>(({ field, props }) => (
  <MyDatePickerInput
    {...field}
    {...props}
  />
));
