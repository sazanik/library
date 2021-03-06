import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import React from 'react';

import { AuthorProps, BookProps } from '../../../types/inerfaces';
import { BookForm } from '../Form/BookForm';
import styles from './BookModal.styles';

interface Props {
  isEdit: boolean;
  author: AuthorProps;
  book: BookProps;
  isOpenModal: boolean;
  setIsOpenModal: (params: boolean) => void;
}

export const BookModal = ({
  isEdit,
  author,
  book,
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
        <IconButton
          sx={styles.closeIcon}
          onClick={() => setIsOpenModal(false)}
          aria-label='close'
          color='default'
        >
          <CloseIcon />
        </IconButton>
        <BookForm isEdit={isEdit} author={author} book={book} setIsOpenModal={setIsOpenModal} />
      </Box>
    </Modal>
  );
};
