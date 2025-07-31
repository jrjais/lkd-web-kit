import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { MyMultiSelect, MyMultiSelectProps } from 'src/components';
import { WithFormProps, withController } from 'src/hocs';

export type FormMultiSelectProps = MyMultiSelectProps & WithFormProps;

export const FormMultiSelect = withController<FormMultiSelectProps>(({ field, props }) => (
  <MyMultiSelect
    {...field}
    {...props}
  />
));
