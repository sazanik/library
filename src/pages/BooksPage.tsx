import React, { SyntheticEvent, useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from '../styles/main';
import { Book, updateBook } from '../features/books/booksSlice';
import { Author } from '../features/authors/authorsSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import {
  authorsSelectors,
  store,
  useAllAuthors,
  useAllBooks,
} from '../App/store';
import BookDialog from '../components/dialogs/BookDialog';
import ModalBookForm from '../components/modals/ModalBookForm';

export default function BooksPage(): JSX.Element {
  const { t } = useTranslation('translation');
  const booksState = useAppSelector((state) => state.books);
  const authors = useAllAuthors();
  const [books, setBooks] = useState<Book[]>(useAllBooks);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<Author>(authors[0]);
  const [currentBook, setCurrentBook] = useState<Book>(books[0]);

  const handleOpenModal = (): void => setOpenModal(true);
  const handleCloseModal = (): void => setOpenModal(false);
  const handleOpenDialog = (): void => setOpenDialog(true);
  const handleCloseDialog = (): void => setOpenDialog(false);

  const updateBooks = (): void => {
    authors.forEach((author) => {
      books.forEach((book) => {
        if (author.id === book.authorId) {
          const authorName = `${author.firstName} ${author.lastName}`;
          dispatch(
            updateBook({
              id: book.id,
              changes: { authorName },
            })
          );
        }
      });
    });
  };

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field !== 'editing') return;
    const book: Book = params.row;
    const author = authorsSelectors.selectById(store.getState(), book.authorId);
    setCurrentBook(book);
    if (!author) return;
    setCurrentAuthor(author);
  };

  const clickHandler = (event: SyntheticEvent): void => {
    const action = event.currentTarget.ariaLabel;
    switch (action) {
      case 'add':
        setEdit(false);
        handleOpenModal();
        break;

      case 'edit':
        setEdit(true);
        handleOpenModal();
        break;

      case 'delete':
        handleOpenDialog();
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

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: t('placeholders.title'),
      flex: 1,
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

  // eslint-disable-next-line
  useEffect(updateBooks, []);

  useEffect(() => {
    setBooks(useAllBooks);
  }, [booksState]);

  return (
    <div style={styles.box}>
      {!authors.length ? (
        <p>{t('infoBooks')}</p>
      ) : !books?.length ? (
        <Button onClick={clickHandler} aria-label='add' style={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons.addBook')}
        </Button>
      ) : (
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={14}
          rowsPerPageOptions={[14]}
          disableSelectionOnClick
          onCellClick={cellClickHandler}
        />
      )}
      <ModalBookForm
        edit={edit}
        author={currentAuthor}
        book={currentBook}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
      <BookDialog
        book={currentBook}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
}
