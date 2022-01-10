import React from 'react';
import { BookProps } from '../../../types/inerfaces';
import { useAppDispatch } from '../../../hooks';
import { DialogBox } from '../../DialogBox/DialogBox';
import { removeBook } from '../../../store/books/actions';

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
  const handleClickDelete = (): void => {
    if (!book) return;
    dispatch(removeBook(book.id));
    setOpenDialog(false);
  };

  return (
    <DialogBox
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      handleClickDelete={handleClickDelete}
      entity='book'
    />
  );
};
