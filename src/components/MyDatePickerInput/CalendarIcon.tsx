import { MantineSize } from '@mantine/core';
import { ComponentProps } from 'react';

interface CalendarIconProps {
  size?: MantineSize;
}

const CalendarIcon = ({ size = 'sm', ...props }: CalendarIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size === 'sm' ? 20 : 24}
      height={size === 'sm' ? 20 : 24}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 5.5C5.66848 5.5 5.35054 5.6317 5.11612 5.86612C4.8817 6.10054 4.75 6.41848 4.75 6.75V18.75C4.75 19.0815 4.8817 19.3995 5.11612 19.6339C5.35054 19.8683 5.66848 20 6 20H18C18.3315 20 18.6495 19.8683 18.8839 19.6339C19.1183 19.3995 19.25 19.0815 19.25 18.75V6.75C19.25 6.41848 19.1183 6.10054 18.8839 5.86612C18.6495 5.6317 18.3315 5.5 18 5.5H6ZM4.05546 4.80546C4.57118 4.28973 5.27065 4 6 4H18C18.7293 4 19.4288 4.28973 19.9445 4.80546C20.4603 5.32118 20.75 6.02065 20.75 6.75V18.75C20.75 19.4793 20.4603 20.1788 19.9445 20.6945C19.4288 21.2103 18.7293 21.5 18 21.5H6C5.27065 21.5 4.57118 21.2103 4.05546 20.6945C3.53973 20.1788 3.25 19.4793 3.25 18.75V6.75C3.25 6.02065 3.53973 5.32118 4.05546 4.80546Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2C16.4142 2 16.75 2.33579 16.75 2.75V6.75C16.75 7.16421 16.4142 7.5 16 7.5C15.5858 7.5 15.25 7.16421 15.25 6.75V2.75C15.25 2.33579 15.5858 2 16 2Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V6.75C8.75 7.16421 8.41421 7.5 8 7.5C7.58579 7.5 7.25 7.16421 7.25 6.75V2.75C7.25 2.33579 7.58579 2 8 2Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 10.75C3.25 10.3358 3.58579 10 4 10H20C20.4142 10 20.75 10.3358 20.75 10.75C20.75 11.1642 20.4142 11.5 20 11.5H4C3.58579 11.5 3.25 11.1642 3.25 10.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14.3929C7 14.0378 7.28782 13.75 7.64286 13.75H9.35714C9.71218 13.75 10 14.0378 10 14.3929V16.1071C10 16.4622 9.71218 16.75 9.35714 16.75H7.64286C7.28782 16.75 7 16.4622 7 16.1071V14.3929Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CalendarIcon;
