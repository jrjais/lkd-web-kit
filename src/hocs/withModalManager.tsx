'use client';
import { ModalProps } from '@mantine/core';
import { useEffect, useState } from 'react';

export type ModalManagerWrappedComponentProps<T extends object = object> = T & {
  modalProps: ModalProps;
};

export type ModalManagerWrapperProps<T extends object = object> = T & {
  modalProps: Partial<ModalProps>;
  removeModal: () => void;
};

export const withModalManager = <CustomProps extends object>(
  WrappedComponent: React.ComponentType<ModalManagerWrappedComponentProps<CustomProps>>,
) => {
  const Wrapper: React.FC<ModalManagerWrapperProps<CustomProps>> = ({ removeModal, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
      setIsOpen(false);
      setTimeout(() => removeModal(), 200);
      props.modalProps.onClose?.();
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

  Wrapper.displayName = `WithModalManager(${WrappedComponent.displayName})`;

  return Wrapper;
};
