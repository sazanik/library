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
import { removeAuthor, allAuthors, Author } from '../features/authors/authorsSlice';
import AddAuthor from '../components/Forms/AddAuthor/AddAuthor';
import { AUTHOR_DIALOG_DESCRIPTION, AUTHOR_DIALOG_TITLE, CANCEL, DELETE } from "../constants/constants";
import { styles } from "./styles";
import AuthorBooks from "../components/Dropdowns/AuthorBooks/AuthorBooks";
import { useAppDispatch } from "../App/hooks";

const dateFormatter = (param: GridValueFormatterParams) => param.value;

export default function AuthorsPage() {
  console.log('allAuthors', allAuthors);

  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [author, setAuthor] = useState<Author | null>(null);

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
      renderCell: (params) => <AuthorBooks books={params.row.books} />
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
    if (params.field === 'edit' || params.field === 'books') {
      setAuthor(params.row);
    }
  };

  const clickHandler = (event: { currentTarget: { ariaLabel: string } }) => {
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
    if (author) {
      dispatch(removeAuthor(author.id));
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
      {!allAuthors?.length
        ?
        <Button onClick={clickHandler} aria-label="add" style={styles.button}>
          <AddIcon fontSize="large" color="primary" />Add author
        </Button>
        :
        <DataGrid
          rows={allAuthors}
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
          {AUTHOR_DIALOG_TITLE}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {AUTHOR_DIALOG_DESCRIPTION}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{CANCEL}</Button>
          <Button onClick={handleClickDelete} autoFocus>{DELETE}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




