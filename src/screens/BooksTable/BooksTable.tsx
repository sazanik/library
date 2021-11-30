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
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectBooks } from "../../features/books/booksSlice";
import AddBook from "../../components/Forms/AddBook/AddBook";

export default function BooksTable() {
  const {removeBook} = actions;
  const books = useSelector(selectBooks);
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
  const [book, setBook] = useState({
      title: '',
      description: '',
      code: '',
      authorName: '',
      pagesCount: '',
      year: '',
      id: '',
      authorId: '',
    },
  );

  const dispatch = useDispatch();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const cellClickHandler = (params: GridCellParams) => {
    if (params.field !== 'edit') return;
    setBook(params.row);
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
    dispatch(removeBook(book))
    handleCloseDialog();
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
      {!books.length
        ?
        <Button onClick={clickHandler} aria-label="add" style={styles.btnAddAuthor}>
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
          <AddBook edit={edit} book={book} closeModal={handleCloseModal} />
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this book?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The book will be removed from the database.
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

const styles = {
  container: {
    bgcolor: '#e3c987',
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddAuthor: {
    fontSize: '26px',
  },
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
};


