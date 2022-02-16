import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAllBooks, useAppDispatch } from '../../../hooks';
import { removeAuthor } from '../../../store/authors/asyncActions';
import { removeBook } from '../../../store/books/asyncActions';
import { AuthorProps } from '../../../types/inerfaces';
import { DialogBox } from '../../DialogBox/DialogBox';

interface Props {
  author: AuthorProps;
  isOpenDialog: boolean;
  setIsOpenDialog: (params: boolean) => void;
}

export const AuthorDialog = ({ author, isOpenDialog, setIsOpenDialog }: Props): JSX.Element => {
  const { t } = useTranslation();
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

  const content = {
    title: t('dialogs:titles.author'),
    description: t('dialogs:descriptions.author'),
  };

  return (
    <DialogBox
      content={content}
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      handleClickDelete={handleClickDelete}
    />
  );
};
