import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Author, removeAuthor } from '../../features/authors/authorsSlice';
import { removeBook } from '../../features/books/booksSlice';
import { useAppDispatch } from '../../App/hooks';
import { useAllBooks } from '../../App/store';

interface Props {
  author: Author;
  openDialog: boolean;

  handleCloseDialog(): void;
}

export default function AuthorDialog({
  author,
  openDialog,
  handleCloseDialog,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation');
  const books = useAllBooks();

  const handleClickDelete = (): void => {
    if (!author) return;
    dispatch(removeAuthor(author.id));
    books.forEach((book) => {
      if (book.authorId === author.id) {
        dispatch(removeBook(book.id));
      }
    });
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
        {t('dialogs.titles.author')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('dialogs.descriptions.author')}
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
