import { Box, Modal } from '@mui/material';
import React from 'react';

import { AuthorProps, BookProps } from '../../../types/inerfaces';
import { BookForm } from '../Form/BookForm';
import styles from './BookModal.styles';

interface Props {
  edit: boolean;
  author: AuthorProps;
  book: BookProps;
  openModal: boolean;

  setOpenModal(b: boolean): void;
}

export const BookModal = ({
  edit,
  author,
  book,
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
        <BookForm
          edit={edit}
          author={author}
          book={book}
          setOpenModal={setOpenModal}
        />
      </Box>
    </Modal>
  );
};
