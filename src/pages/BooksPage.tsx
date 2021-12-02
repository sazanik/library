import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
} from '@mui/x-data-grid';

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
import { useDispatch, useSelector } from 'react-redux';
import AddBook from "../components/Forms/AddBook/AddBook";
import { actions, selectLibrary } from "../features/library/librarySlice";
import { Book } from "../types/book";
import { Author } from "../types/author";
import { styles } from "./styles";
import { BOOK_DIALOG_DESCRIPTION, BOOK_DIALOG_TITLE } from "../constants/constants";

export default function BooksPage() {
  const authors = useSelector(selectLibrary);
  const [books, setBooks] = useState(authors[0]?.books);
  const {deleteBook} = actions;

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
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [author, setAuthor] = useState<Author>(authors[0]);
  const [book, setBook] = useState<Book>(authors[0]?.books[0]);

  const dispatch = useDispatch();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const cellClickHandler = (params: GridCellParams) => {
    if (params.field !== 'edit') return;
    const authorId = params.row.authorId;
    const bookId = params.row.id;
    const author = authors.find((author: Author) => author.id === authorId);
    const book: Book | undefined = author?.books.find((book: Book) => book.id === bookId);
    if (author) {
      setAuthor(author);
    }
    if (book) {
      setBook(book);
    }
  };

  const clickHandler = (event: SyntheticEvent) => {
    const action = event.currentTarget.ariaLabel;
    switch (action) {
      case 'add' :
        setEdit(false);
        return handleOpenModal();

      case 'edit' :
        setEdit(true);
        return handleOpenModal();

      case 'delete' :
        return handleOpenDialog();
    }
  };

  const handleClickDelete = () => {
    dispatch(deleteBook(book));
    handleCloseDialog();
  };

  useEffect(() => {
    let allBooks: Book [] = [];
    for (const author of authors) {
      allBooks = allBooks.concat(author.books);
      setBooks(allBooks);
    }
  }, [authors]);

  function editingCell() {
    return (
      <>
        <IconButton onClick={clickHandler} aria-label="add">
          <AddIcon fontSize="small" color="success" />
        </IconButton>
        <IconButton onClick={clickHandler} aria-label="edit">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={clickHandler} aria-label="delete">
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </>
    );
  }

  return (
    <div style={styles.container}>
      {!books?.length
        ?
        <Button onClick={clickHandler} aria-label="add" style={styles.button}>
          <AddIcon fontSize="large" color="primary" />Add book
        </Button>
        :
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          disableSelectionOnClick
          componentsProps={{}}
          onCellClick={cellClickHandler}
        />
      }
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <AddBook edit={edit} book={book} author={author} closeModal={handleCloseModal} />
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {BOOK_DIALOG_TITLE}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
