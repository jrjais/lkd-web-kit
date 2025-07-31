'use client';
import { ModalProps } from '@mantine/core';
import { useEffect, useState } from 'react';

interface WithModalManagerProps {
  // fn que desmonta el modal desde el contexto
  removeModal: () => void;
}

export type WrappedComponentProps<T = any> = T & { modalProps: ModalProps };

export const withModalManager = <CustomProps extends Object>(
  WrappedComponent: React.ComponentType<WrappedComponentProps<CustomProps>>,
) => {
  const Component: React.FC<WrappedComponentProps<CustomProps> & WithModalManagerProps> = ({
    removeModal,
    ...props
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
      setIsOpen(false);
      setTimeout(() => removeModal(), 200);
      props.modalProps.onClose();
    };

    useEffect(() => {
      if (props.modalProps.opened) setTimeout(() => setIsOpen(true), 0);
      else onClose();
    }, [props.modalProps.opened]);

    return (
      <WrappedComponent
        {...(props as CustomProps)}
        modalProps={{
          ...props.modalProps,
          opened: isOpen,
          onClose: onClose,
        }}
      />
    );
  };

  Component.displayName = `WithModalManager(${WrappedComponent.displayName})`;

  return Component;
};
