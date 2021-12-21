import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { removeBook } from '../../../store/books/booksSlice';
import { useTranslation } from 'react-i18next';
import { BookProps } from '../../../types/inerfaces';
import { useAppDispatch } from '../../../hooks';

interface Props {
  book: BookProps;
  openDialog: boolean;

  setOpenDialog(b: boolean): void;
}

export const BookDialog = ({
  book,
  openDialog,
  setOpenDialog,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('default');
  const handleClickDelete = (): void => {
    if (!book) return;
    dispatch(removeBook(book.id));
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {t('dialogs.titles.book')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('dialogs.descriptions.book')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>
          {t('buttons.cancel')}
        </Button>
        <Button onClick={handleClickDelete} autoFocus>
          {t('buttons.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
