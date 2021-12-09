import React, { useState } from 'react';
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
import { Box, Button, IconButton, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Author } from '../features/authors/authorsSlice';
import AddAuthor from '../components/forms/AddAuthor';
import { styles } from '../styles/styles';
import AuthorBooks from '../components/dropdowns/AuthorBooks';
import { useAllAuthors } from '../App/store';
import ConfirmingDialog from '../components/dialogs/ConfirmingDialog';

const dateFormatter = (param: GridValueFormatterParams): GridCellValue =>
  param.value;

export default function AuthorsPage(): JSX.Element {
  const authors = useAllAuthors();
  const { t } = useTranslation('translation');
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [author, setAuthor] = useState<Author>(authors[0]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (): void => setOpenDialog(true);
  const handleCloseDialog = (): void => setOpenDialog(false);

  const handleOpenModal = (): void => setOpenModal(true);
  const handleCloseModal = (): void => setOpenModal(false);

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
      <ConfirmingDialog
        author={author}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
}
