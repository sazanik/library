import React, { ReactElement } from 'react';
import { Box, Modal } from '@mui/material';
import styles from './styles';
import { IAuthor } from '../../../features/authors/authorsSlice';
import AddBook from '../../forms/AddBook/AddBook';
import { IBook } from '../../../features/books/booksSlice';

interface IProps {
  edit: boolean;
  author: IAuthor;
  book: IBook;
  openModal: boolean;

  setOpenModal(b: boolean): void;
}

export default function BookModal({
  edit,
  author,
  book,
  openModal,
  setOpenModal,
}: IProps): ReactElement {
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
