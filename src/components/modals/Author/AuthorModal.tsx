import React, { ReactElement } from 'react';
import { Box, Modal } from '@mui/material';
import styles from './styles';
import AddAuthor from '../../forms/AddAuthor/AddAuthor';
import { IAuthor } from '../../../features/authors/authorsSlice';

interface IProps {
  edit: boolean;
  author: IAuthor;
  openModal: boolean;

  setOpenModal(b: boolean): void;
}

export default function AuthorModal({
  edit,
  author,
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
        <AddAuthor edit={edit} author={author} setOpenModal={setOpenModal} />
      </Box>
    </Modal>
  );
}
