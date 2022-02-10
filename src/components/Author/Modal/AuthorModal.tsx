import { Box, Modal } from '@mui/material';
import React from 'react';

import { AuthorProps } from '../../../types/inerfaces';
import { AuthorForm } from '../Form/AuthorForm';
import styles from './AuthorModal.styles';

interface Props {
  isEdit: boolean;
  author: AuthorProps;
  isOpenModal: boolean;
  setIsOpenModal: (params: boolean) => void;
}

export const AuthorModal = ({
  isEdit,
  author,
  isOpenModal,
  setIsOpenModal,
}: Props): JSX.Element => {
  return (
    <Modal
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styles.box}>
        <AuthorForm
          isEdit={isEdit}
          author={author}
          setIsOpenModal={setIsOpenModal}
        />
      </Box>
    </Modal>
  );
};
