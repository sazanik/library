import React, { ReactElement } from 'react';
import { Box, Modal } from '@mui/material';
import styles from './styles';
import AddAuthor from '../forms/AddAuthor';
import { Author } from '../../features/authors/authorsSlice';

interface Props {
  edit: boolean;
  author: Author;
  openModal: boolean;

  setOpenModal(b: boolean): void;
}

export default function ModalAuthorForm({
  edit,
  author,
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
        <AddAuthor edit={edit} author={author} setOpenModal={setOpenModal} />
      </Box>
    </Modal>
  );
}
