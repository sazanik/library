import React, { SyntheticEvent, useState } from 'react';
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
import AddBook from "../components/Forms/AddBook/AddBook";
import { styles } from "./styles";
import { BOOK_DIALOG_DESCRIPTION, BOOK_DIALOG_TITLE } from "../constants/constants";
import { removeBook, Book } from "../features/books/booksSlice";
import { Author } from "../features/authors/authorsSlice";
import { useAppDispatch } from "../App/hooks";
import { useAllAuthors, useAllBooks } from "../App/store";

export default function BooksPage() {
  const authors = useAllAuthors()
  const books = useAllBooks()
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [author, setAuthor] = useState<Author | null>(authors[0]);
  const [book, setBook] = useState<Book | null>(null);

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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const cellClickHandler = (params: GridCellParams) => {
    if (params.field !== 'edit') return;
    setBook(params.row)
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
    if (book) {
      dispatch(removeBook(book.id));
      handleCloseDialog();
    }
  };

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
