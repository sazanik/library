import React, { ReactElement } from 'react';
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
import { useAllBooks } from '../../App/hooks';

interface Props {
  author: Author;
  openDialog: boolean;

  setOpenDialog(b: boolean): void;
}

export default function AuthorDialog({
  author,
  openDialog,
  setOpenDialog,
}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('default');
  const books = useAllBooks();

  const handleClickDelete = (): void => {
    if (!author) return;
    dispatch(removeAuthor(author.id));
    books.forEach((book) => {
      if (book.authorId === author.id) {
        dispatch(removeBook(book.id));
      }
    });
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={setOpenDialog}
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
