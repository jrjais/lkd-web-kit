import { ReactNode } from 'react'
import { InfinitySelect, InfinitySelectProps } from 'src/components'
import { WithControllerProps, withController } from 'src/hocs'

export type FormInfinitySelectProps<T = unknown> = InfinitySelectProps<T> & WithControllerProps

export const FormInfinitySelect = withController<FormInfinitySelectProps>(({ field, props }) => {
  return (
    <InfinitySelect
      {...field}
      {...props}
      onChange={(e) => {
        field.onChange(e)
        props.onChange?.(e)
      }}
    />
  )
}) as <T>(props: FormInfinitySelectProps<T>) => ReactNode
