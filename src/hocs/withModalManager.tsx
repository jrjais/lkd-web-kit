'use client';
import { ModalProps } from '@mantine/core';
import { useEffect, useState } from 'react';

export interface WithModalManagerProps {
  removeModal: () => void;
  opened: boolean;
}

export const withModalManager = <P extends Object>(
  WrappedComponent: React.ComponentType<P & ModalProps>,
) => {
  const Component: React.FC<P & WithModalManagerProps & ModalProps> = ({
    removeModal,
    opened,
    ...props
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
      setIsOpen(false);
      setTimeout(() => removeModal(), 200);
      props.onClose?.();
    };

    useEffect(() => {
      if (opened) setTimeout(() => setIsOpen(true), 0);
      else onClose();
    }, [opened]);

    return (
      <WrappedComponent
        {...(props as P)}
        opened={isOpen}
        onClose={onClose}
      />
    );
  };

  Component.displayName = `withModalManager(${WrappedComponent.displayName})`;

  return Component;
};
