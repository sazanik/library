import React, { ReactElement } from 'react';
import { Box, Modal } from '@mui/material';
import styles from './styles';
import { Author } from '../../features/authors/authorsSlice';
import AddBook from '../forms/AddBook';
import { Book } from '../../features/books/booksSlice';

interface Props {
  edit: boolean;
  author: Author;
  book: Book;
  openModal: boolean;

  setOpenModal(b: boolean): void;
}

export default function ModalBookForm({
  edit,
  author,
  book,
  openModal,
  setOpenModal,
}: Props): ReactElement {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styles.box}>
        <AddBook
          edit={edit}
          author={author}
          book={book}
          setOpenModal={setOpenModal}
        />
      </Box>
    </Modal>
  );
}
