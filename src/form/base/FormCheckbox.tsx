import { CheckboxProps, Checkbox } from '@mantine/core';
import { WithFormProps, withForm } from 'src/hocs';

export type FormCheckboxProps = CheckboxProps & WithFormProps;

export const FormCheckbox = withForm<FormCheckboxProps>(({ field, props }) => (
  <Checkbox
    {...field}
    checked={field.value}
    {...props}
  />
));
