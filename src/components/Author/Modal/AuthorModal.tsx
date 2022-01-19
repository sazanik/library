import { Box, Modal } from '@mui/material';
import React from 'react';

import { AuthorProps } from '../../../types/inerfaces';
import { AuthorForm } from '../Form/AuthorForm';
import styles from './AuthorModal.styles';

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
