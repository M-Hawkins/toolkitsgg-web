import { Modal, type ModalProps } from '@mantine/core';
import classes from './AppModal.module.css';

type AppModalProps = ModalProps;

const AppModal = ({ classNames: _classNames, ...props }: AppModalProps) => {
  return (
    <Modal
      {...props}
      classNames={{
        header: classes.modalHeader,
        content: classes.modal,
      }}
    />
  );
};

export { AppModal };
