import React from 'react';
import { Box, Modal } from '@mui/material';
import modal from '../../styles/modal';
import AddAuthor from '../forms/AddAuthor';
import { Author } from '../../features/authors/authorsSlice';

interface Props {
  edit: boolean;
  author: Author;
  openModal: boolean;

  handleCloseModal(): void;
}

export default function ModalAuthorForm({
  edit,
  author,
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
        <AddAuthor
          edit={edit}
          author={author}
          handleCloseModal={handleCloseModal}
        />
      </Box>
    </Modal>
  );
}
