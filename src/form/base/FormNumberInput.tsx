import { MyNumberInputProps, MyNumberInput } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormNumberInputProps = MyNumberInputProps & WithFormProps;

export const FormNumberInput = withForm<FormNumberInputProps>(({ field, props }) => (
  <MyNumberInput
    {...field}
    {...props}
  />
));
