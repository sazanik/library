import React from 'react';
import { removeBook } from '../../../store/books/booksSlice';
import { AuthorProps } from '../../../types/inerfaces';
import { useAllBooks, useAppDispatch } from '../../../hooks';
import { removeAuthor } from '../../../store/authors/actions';
import { DialogBox } from '../../DialogBox/DialogBox';

interface Props {
  author: AuthorProps;
  openDialog: boolean;
  setOpenDialog: (b: boolean) => void;
}

export const AuthorDialog = ({
  author,
  openDialog,
  setOpenDialog,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const books = useAllBooks();

  const handleClickDelete = (): void => {
    if (!author) {
      return;
    }
    dispatch(removeAuthor(author.id));
    books.forEach((book) => {
      if (book.authorId === author.id) {
        dispatch(removeBook(book.id));
      }
    });
    setOpenDialog(false);
  };

  return (
    <DialogBox
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      handleClickDelete={handleClickDelete}
      entity='author'
    />
  );
};
