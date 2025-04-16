import { SelectInfinityProps, SelectInfinity } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormSelectInfinityProps = SelectInfinityProps & WithFormProps;

export const FormSelectInfinity = withForm<SelectInfinityProps>(({ field, props }) => (
  <SelectInfinity
    {...field}
    {...props}
  />
));
