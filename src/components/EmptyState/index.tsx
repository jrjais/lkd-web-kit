import { Text, useMantineTheme } from '@mantine/core'
import { ComponentProps, ReactNode } from 'react'
import { Icon, IconFC } from '../Icon'

/**
 * @deprecated Use Mantine's EmptyState from @mantine/core instead.
 */
export interface EmptyProps extends ComponentProps<'div'> {
  label: ReactNode
  action?: ReactNode
  icon?: IconFC
  size?: keyof typeof pxBySize
}

const pxBySize = {
  sm: 48,
  md: 60,
  lg: 84,
}

/**
 * @deprecated Use Mantine's EmptyState from @mantine/core instead.
 */
export const EmptyState = ({ label, action, icon, size = 'md', ...props }: EmptyProps) => {
  const { colors } = useMantineTheme()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
      {...props}
    >
      {icon && (
        <Icon
          i={icon}
          size={pxBySize[size]}
          style={{
            color: colors.gray[2],
          }}
        />
      )}
      <Text
        c={'gray.6'}
        style={{
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {label}
      </Text>
      <div>{action}</div>
    </div>
  )
}
