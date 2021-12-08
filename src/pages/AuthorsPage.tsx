import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridCellParams,
  GridCellValue,
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
import { useTranslation } from 'react-i18next';
import { removeAuthor, Author } from '../features/authors/authorsSlice';
import AddAuthor from '../components/Forms/AddAuthor/AddAuthor';
import { styles } from './styles';
import AuthorBooks from '../components/Dropdowns/AuthorBooks/AuthorBooks';
import { useAllAuthors, useAllBooks } from '../App/store';
import { useAppDispatch } from '../App/hooks';
import { removeBook } from '../features/books/booksSlice';

const dateFormatter = (param: GridValueFormatterParams): GridCellValue =>
  param.value;

export default function AuthorsPage(): JSX.Element {
  const authors = useAllAuthors();
  const books = useAllBooks();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('translations');
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [author, setAuthor] = useState<Author>(authors[0]);

  const handleOpenModal = (): void => setOpenModal(true);
  const handleCloseModal = (): void => setOpenModal(false);
  const handleOpenDialog = (): void => setOpenDialog(true);
  const handleCloseDialog = (): void => setOpenDialog(false);

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field === 'edit' || params.field === 'books') {
      setAuthor(params.row);
    }
  };

  const clickHandler = (event: {
    currentTarget: { ariaLabel: string };
  }): void => {
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

  const editingCell = (): JSX.Element => (
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
      renderCell: () => <AuthorBooks author={author} />,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 120,
      renderCell: editingCell,
    },
  ];

  const handleClickDelete = (): void => {
    if (author) {
      dispatch(removeAuthor(author.id));
      books.forEach((book) => {
        if (book.authorId === author.id) {
          dispatch(removeBook(book.id));
        }
      });
      handleCloseDialog();
    }
  };

  return (
    <div style={styles.container}>
      {!authors.length ? (
        <Button onClick={clickHandler} aria-label='add' style={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons.addAuthor')}
        </Button>
      ) : (
        <DataGrid
          rows={authors}
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
          <AddAuthor
            edit={edit}
            author={author}
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
        <DialogTitle id='alert-dialog-title'>{AUTHOR_DIALOG_TITLE}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {AUTHOR_DIALOG_DESCRIPTION}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{CANCEL}</Button>
          <Button onClick={handleClickDelete} autoFocus>
            {DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
