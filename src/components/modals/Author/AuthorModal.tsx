import React from 'react';
import { Box, Modal } from '@mui/material';
import styles from './styles';
import { AuthorForm } from '../../forms/Author/AuthorForm';
import { AuthorProps } from '../../../types/inerfaces';

interface Props {
  edit: boolean;
  author: AuthorProps;
  openModal: boolean;

  setOpenModal(b: boolean): void;
}

export const AuthorModal = ({
  edit,
  author,
  openModal,
  setOpenModal,
}: Props): JSX.Element => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styles.box}>
        <AuthorForm edit={edit} author={author} setOpenModal={setOpenModal} />
      </Box>
    </Modal>
  );
};
