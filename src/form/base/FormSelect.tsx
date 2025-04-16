import { MySelectProps, MySelect } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormSelectProps = MySelectProps & WithFormProps;

export const FormSelect = withForm<FormSelectProps>(({ field, props }) => (
  <MySelect
    {...field}
    {...props}
  />
));
