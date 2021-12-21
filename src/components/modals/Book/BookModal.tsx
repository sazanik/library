import React from 'react';
import { Box, Modal } from '@mui/material';
import styles from './styles';
import { BookForm } from '../../forms/Book/BookForm';

import { AuthorProps, BookProps } from '../../../types/inerfaces';

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
