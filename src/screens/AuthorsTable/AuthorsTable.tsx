import React, { useState } from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueFormatterParams,
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
import { actions, selectAuthors } from '../../features/authors/authorsSlice';
import AddAuthor from '../../components/Forms/AddAuthor/AddAuthor';
import BooksOfAuthor from "../../components/Dropdowns/BooksOfAuthor/BooksOfAuthor";

const dateFormatter = (param: GridValueFormatterParams) => param.value;

export default function AuthorsTable() {
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [author, setAuthor] = useState({
      firstName: '',
      lastName: '',
      birthDate: '',
      country: '',
      books: [],
      id: '',
    },
  );
  const {deleteAuthor} = actions;
  const authors = useSelector(selectAuthors);

  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 1,
    },
    {
      field: 'birthDate',
      headerName: 'Birth date',
      flex: 1,
      valueFormatter: dateFormatter,
    },
    {
      field: 'country',
      headerName: 'Country of birth',
      flex: 1,
    },
    {
      field: 'books',
      headerName: 'Books',
      flex: 1,
      renderCell: (params) => <BooksOfAuthor books={params.row.books} />
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 120,
      renderCell: editingCell,
    },
  ];

  const dispatch = useDispatch();


  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);


  const cellClickHandler = (params: GridCellParams) => {
    if (params.field === 'edit' || params.field === 'books') {
      setAuthor(params.row);
    }
  };

  const clickHandler = (event: any) => {
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
    dispatch(deleteAuthor(author));
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
      {!authors.length
        ?
        <Button onClick={clickHandler} aria-label="add" style={styles.btnAddAuthor}>
          <AddIcon fontSize="large" color="primary" />Add author
        </Button>
        :
        <DataGrid
          rows={authors}
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
          <AddAuthor edit={edit} author={author} closeModal={handleCloseModal} />
        </Box>
      </Modal>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this author?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The author and his books will be removed from the database.
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


