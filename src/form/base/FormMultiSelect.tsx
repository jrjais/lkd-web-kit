import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { MyMultiSelect, MyMultiSelectProps } from 'src/components';
import { WithFormProps, withForm } from 'src/hocs';

export type FormMultiSelectProps = MyMultiSelectProps & WithFormProps;

const FormMultiSelect = withForm<FormMultiSelectProps>(({ field, props }) => (
  <MyMultiSelect
    {...field}
    {...props}
  />
));

export default FormMultiSelect;
