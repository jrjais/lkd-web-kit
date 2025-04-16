import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';
import { IconFC, Icon } from '../Icon';

export interface EmptyProps extends ComponentProps<'div'> {
  label: ReactNode;
  action?: ReactNode;
  icon?: IconFC;
  size?: keyof typeof pxBySize;
}

const pxBySize = {
  sm: 48,
  md: 60,
  lg: 84,
};

export const EmptyState = ({
  label,
  action,
  icon,
  className,
  size = 'md',
  ...props
}: EmptyProps) => {
  return (
    <div
      className={clsx('justfiy-center flex flex-col items-center gap-1', className)}
      {...props}
    >
      {icon && (
        <Icon
          i={icon}
          size={pxBySize[size]}
          className="text-gray-2"
        />
      )}
      <p className="text-gray-6 text-sm font-semibold">{label}</p>
      <div>{action}</div>
    </div>
  );
};
