import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import React, { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BookDialog } from '../../components/Book/Dialog/BookDialog';
import { BookModal } from '../../components/Book/Modal/BookModal';
import { Loader } from '../../components/Loader/Loader';
import { Table } from '../../components/Table/Table';
import { useAllAuthors, useAllBooks, useAppSelector } from '../../hooks';
import { authorsSelectors, store } from '../../store/store';
import { Actions, Fields } from '../../types/enums';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { styles } from './ScreensBooksList.styles';

export const ScreensBooksList = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.app);
  const authors = useAllAuthors();
  const books = useAllBooks();
  const [edit, setEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<AuthorProps>(authors[0]);
  const [currentBook, setCurrentBook] = useState<BookProps>(books[0]);

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field !== Fields.Editing) return;
    const book: BookProps = params.row;
    const author = authorsSelectors.selectById(store.getState(), book.authorId);
    setCurrentBook(book);
    if (!author) {
      return;
    }
    setCurrentAuthor(author);
  };

  const clickHandler = (event: MouseEvent<HTMLButtonElement>): void => {
    const action: string = event.currentTarget.ariaLabel;
    switch (action) {
      case Actions.Add:
        setEdit(false);
        setIsOpenModal(true);
        break;

      case Actions.Edit:
        setEdit(true);
        setIsOpenModal(true);
        break;

      case Actions.Delete:
        setIsOpenDialog(true);
        break;

      default:
        break;
    }
  };

  function editingCell(): JSX.Element {
    return (
      <>
        <IconButton onClick={clickHandler} aria-label='edit'>
          <EditIcon fontSize='small' />
        </IconButton>
        <IconButton onClick={clickHandler} aria-label='delete'>
          <DeleteIcon fontSize='small' color='error' />
        </IconButton>
      </>
    );
  }

  const openBook = (event: GridRenderCellParams): void => {
    navigate(`/books/${event.id}`);
  };

  const renderTitleCells = (params: GridRenderCellParams): JSX.Element => (
    <Button sx={styles.buttonLeft} onClick={() => openBook(params)}>
      {params.value}
    </Button>
  );

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: t('placeholders:title'),
      flex: 1,
      renderCell: renderTitleCells,
    },
    {
      field: 'description',
      headerName: t('placeholders:description'),
      flex: 1,
    },
    {
      field: 'code',
      headerName: t('placeholders:code'),
      flex: 1,
    },
    {
      field: 'authorName',
      headerName: t('placeholders:authorName'),
      flex: 1,
    },
    {
      field: 'pagesCount',
      headerName: t('placeholders:pagesCount'),
      flex: 1,
    },
    {
      field: 'publishingYear',
      headerName: t('placeholders:publishingYear'),
      flex: 1,
    },
    {
      field: 'editing',
      headerName: t('placeholders:editing'),
      width: 120,
      renderCell: editingCell,
    },
  ];

  const booksWithAuthors = (): BookProps[] => {
    return books.map((book) => {
      const author = authorsSelectors.selectById(
        store.getState(),
        book.authorId
      );
      const authorName = `${author?.firstName} ${author?.lastName}`;
      return {
        ...book,
        authorName,
      };
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={styles.box}>
      {!authors.length ? (
        <Typography>{t('glossary:infoBooks')}</Typography>
      ) : !books?.length ? (
        <Button onClick={clickHandler} aria-label='add' sx={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons:addBook')}
        </Button>
      ) : (
        <Table
          buttonTitle={t('buttons:addBook')}
          rows={booksWithAuthors()}
          columns={columns}
          onCellClick={cellClickHandler}
          setEdit={setEdit}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      <BookModal
        edit={edit}
        author={currentAuthor}
        book={currentBook}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <BookDialog
        book={currentBook}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
    </Box>
  );
};
