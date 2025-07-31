import { MyNumberInputProps, MyNumberInput } from 'src/components';
import { WithControllerProps, withController } from 'src/hocs';

export type FormNumberInputProps = MyNumberInputProps & WithControllerProps;

export const FormNumberInput = withController<FormNumberInputProps>(({ field, props }) => (
  <MyNumberInput
    {...field}
    {...props}
  />
));
