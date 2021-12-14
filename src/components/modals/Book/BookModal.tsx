import React, { ReactElement } from 'react';
import { Box, Modal } from '@mui/material';
import styles from './styles';
import BookForm from '../../forms/Book/BookForm';
import { IAuthor, IBook } from '../../../types/inerfaces';

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
        <BookForm
          edit={edit}
          author={author}
          book={book}
          setOpenModal={setOpenModal}
        />
      </Box>
    </Modal>
  );
}
