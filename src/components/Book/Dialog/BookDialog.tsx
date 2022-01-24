import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../hooks';
import { removeBook } from '../../../store/books/actions';
import { BookProps } from '../../../types/inerfaces';
import { DialogBox } from '../../DialogBox/DialogBox';

interface Props {
  book: BookProps;
  isOpenDialog: boolean;
  setIsOpenDialog: (params: boolean) => void;
}

export const BookDialog = ({
  book,
  isOpenDialog,
  setIsOpenDialog,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleClickDelete = (): void => {
    if (!book) {
      return;
    }
    dispatch(removeBook(book.id));
    setIsOpenDialog(false);
  };
  const content = {
    title: t('dialogs:titles.book'),
    description: t('dialogs:descriptions.book'),
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
