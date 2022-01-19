import React from 'react';

import { useAllBooks, useAppDispatch } from '../../../hooks';
import { removeAuthor } from '../../../store/authors/actions';
import { removeBook } from '../../../store/books/actions';
import { AuthorProps } from '../../../types/inerfaces';
import { DialogBox } from '../../DialogBox/DialogBox';

interface Props {
  author: AuthorProps;
  isOpenDialog: boolean;
  setIsOpenDialog: (params: boolean) => void;
}

export const AuthorDialog = ({
  author,
  isOpenDialog,
  setIsOpenDialog,
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
    setIsOpenDialog(false);
  };

  return (
    <DialogBox
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      handleClickDelete={handleClickDelete}
      entity='author'
    />
  );
};
