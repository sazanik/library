import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Book, removeBook } from '../../features/books/booksSlice';
import { useAppDispatch } from '../../App/hooks';
import { useTranslation } from 'react-i18next';

interface Props {
  book: Book;
  openDialog: boolean;

  handleCloseDialog(): void;
}

export default function BookDialog({
  book,
  openDialog,
  handleCloseDialog,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation');
  const handleClickDelete = (): void => {
    if (!book) return;
    dispatch(removeBook(book.id));
    handleCloseDialog();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
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
        <Button onClick={handleCloseDialog}>{t('buttons.cancel')}</Button>
        <Button onClick={handleClickDelete} autoFocus>
          {t('buttons.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
