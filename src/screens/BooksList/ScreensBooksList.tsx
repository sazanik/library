import React, { MouseEvent, useEffect, useState } from 'react';
import {
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { authorsSelectors, store } from '../../store/store';
import { BookDialog } from '../../components/Book/Dialog/BookDialog';
import { BookModal } from '../../components/Book/Modal/BookModal';
import { Actions, Entities, Fields } from '../../types/enums';
import { useNavigate } from 'react-router-dom';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { useAllAuthors, useAllBooks, useAppSelector } from '../../hooks';
import { styles } from './ScreensBooksList.styles';
import { Table } from '../../components/Table/Table';

export const ScreensBooksList = (): JSX.Element => {
  const { t } = useTranslation('default');
  const navigate = useNavigate();
  const booksState = useAppSelector((state) => state.books);
  const authors = useAllAuthors();
  const [books, setBooks] = useState<BookProps[]>(useAllBooks);
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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
        setOpenModal(true);
        break;

      case Actions.Edit:
        setEdit(true);
        setOpenModal(true);
        break;

      case Actions.Delete:
        setOpenDialog(true);
        break;

      default:
        break;
    }
  };

  function editingCell(): JSX.Element {
    return (
      <>
        <IconButton onClick={clickHandler} aria-label='add'>
          <AddIcon fontSize='small' color='success' />
        </IconButton>
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
      headerName: t('placeholders.title'),
      flex: 1,
      renderCell: renderTitleCells,
    },
    {
      field: 'description',
      headerName: t('placeholders.description'),
      flex: 1,
    },
    {
      field: 'code',
      headerName: t('placeholders.code'),
      flex: 1,
    },
    {
      field: 'authorName',
      headerName: t('placeholders.authorName'),
      flex: 1,
    },
    {
      field: 'pagesCount',
      headerName: t('placeholders.pagesCount'),
      flex: 1,
    },
    {
      field: 'publishingYear',
      headerName: t('placeholders.publishingYear'),
      flex: 1,
    },
    {
      field: 'editing',
      headerName: t('placeholders.editing'),
      width: 120,
      renderCell: editingCell,
    },
  ];

  useEffect(() => {
    setBooks(useAllBooks);
  }, [booksState]);

  return (
    <Box sx={styles.box}>
      {!authors.length ? (
        <Typography>{t('infoBooks')}</Typography>
      ) : !books?.length ? (
        <Button onClick={clickHandler} aria-label='add' sx={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons.addBook')}
        </Button>
      ) : (
        <Table
          entity={Entities.Book}
          rows={books}
          columns={columns}
          onCellClick={cellClickHandler}
        />
      )}
      <BookModal
        edit={edit}
        author={currentAuthor}
        book={currentBook}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <BookDialog
        book={currentBook}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Box>
  );
};
