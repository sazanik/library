import React from 'react';
import { Box, Modal } from '@mui/material';
import modal from '../../styles/modal';
import { Author } from '../../features/authors/authorsSlice';
import AddBook from '../forms/AddBook';
import { Book } from '../../features/books/booksSlice';

interface Props {
  edit: boolean;
  author: Author;
  book: Book;
  openModal: boolean;

  handleCloseModal(): void;
}

export default function ModalBookForm({
  edit,
  author,
  book,
  openModal,
  handleCloseModal,
}: Props): JSX.Element {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modal.box}>
        <AddBook
          edit={edit}
          author={author}
          book={book}
          handleCloseModal={handleCloseModal}
        />
      </Box>
    </Modal>
  );
}
