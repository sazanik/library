import React, { SyntheticEvent, useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  IconButton,
  Modal,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddBook from '../components/Forms/AddBook/AddBook';
import { styles } from './styles';
import {
  BOOK_DIALOG_DESCRIPTION,
  BOOK_DIALOG_TITLE,
} from '../constants/constants';
import { removeBook, Book, updateBook } from '../features/books/booksSlice';
import { Author } from '../features/authors/authorsSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import {
  authorsSelectors,
  store,
  useAllAuthors,
  useAllBooks,
} from '../App/store';

export default function BooksPage(): JSX.Element {
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
    if (params.field !== 'edit') return;
    const book: Book = params.row;
    const author = authorsSelectors.selectById(store.getState(), book.authorId);
    setCurrentBook(book);
    if (author) {
      setCurrentAuthor(author);
    }
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

  const handleClickDelete = (): void => {
    if (currentBook) {
      dispatch(removeBook(currentBook.id));
      handleCloseDialog();
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
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'code',
      headerName: 'Code',
      flex: 1,
    },
    {
      field: 'authorName',
      headerName: 'Author',
      flex: 1,
    },
    {
      field: 'pagesCount',
      headerName: 'Pages count',
      flex: 1,
    },
    {
      field: 'year',
      headerName: 'Year',
      flex: 1,
    },
    {
      field: 'edit',
      headerName: 'Edit',
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
    <div style={styles.container}>
      {!books?.length ? (
        <Button onClick={clickHandler} aria-label='add' style={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          Add book
        </Button>
      ) : (
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          disableSelectionOnClick
          componentsProps={{}}
          onCellClick={cellClickHandler}
        />
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styles.modal}>
          <AddBook
            edit={edit}
            author={currentAuthor}
            book={currentBook}
            closeModal={handleCloseModal}
          />
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{BOOK_DIALOG_TITLE}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {BOOK_DIALOG_DESCRIPTION}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleClickDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
