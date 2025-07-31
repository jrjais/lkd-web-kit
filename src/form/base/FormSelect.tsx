import { MySelectProps, MyMultiSelect, MySelect } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormSelectProps = MySelectProps & WithFormProps;

export const FormSelect = withController<FormSelectProps>(({ field, props }) => (
  <MySelect
    {...field}
    {...props}
  />
));
