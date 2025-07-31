import { MyNumberInputProps, MyNumberInput } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormNumberInputProps = MyNumberInputProps & WithFormProps;

export const FormNumberInput = withController<FormNumberInputProps>(({ field, props }) => (
  <MyNumberInput
    {...field}
    {...props}
  />
));
