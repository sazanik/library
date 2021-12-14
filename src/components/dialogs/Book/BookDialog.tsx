import React, { ReactElement } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { IBook, removeBook } from '../../../features/books/booksSlice';
import { useAppDispatch } from '../../../App/hooks';
import { useTranslation } from 'react-i18next';

interface IProps {
  book: IBook;
  openDialog: boolean;

  setOpenDialog(b: boolean): void;
}

export default function BookDialog({
  book,
  openDialog,
  setOpenDialog,
}: IProps): ReactElement {
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
}
