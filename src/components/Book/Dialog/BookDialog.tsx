import React from 'react';

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
  const dispatch = useAppDispatch();
  const handleClickDelete = (): void => {
    if (!book) return;
    dispatch(removeBook(book.id));
    setIsOpenDialog(false);
  };

  return (
    <DialogBox
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      handleClickDelete={handleClickDelete}
      entity='book'
    />
  );
};
