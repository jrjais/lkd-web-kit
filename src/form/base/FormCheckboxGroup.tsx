import { WithControllerProps, withController } from 'src/hocs';
import { MyCheckboxGroup, MyCheckboxGroupProps } from 'src/components/MyCheckboxGroup';

export type FormCheckboxGroupProps = MyCheckboxGroupProps & WithControllerProps;

export const FormCheckboxGroup = withController<FormCheckboxGroupProps>(({ field, props }) => (
  <MyCheckboxGroup
    {...field}
    {...props}
  />
));
