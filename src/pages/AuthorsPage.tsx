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
import { Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Author } from '../features/authors/authorsSlice';
import table from '../styles/table';
import AuthorBooks from '../components/dropdowns/AuthorBooks';
import { useAllAuthors } from '../App/store';
import AuthorDialog from '../components/dialogs/AuthorDialog';
import ModalAuthorForm from '../components/modals/ModalAuthorForm';

const dateFormatter = (param: GridValueFormatterParams): GridCellValue =>
  param.value;

export default function AuthorsPage(): JSX.Element {
  const { t } = useTranslation('translation');
  const authors = useAllAuthors();
  const [currentAuthor, setCurrentAuthor] = useState<Author>(authors[0]);
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (): void => setOpenDialog(true);
  const handleCloseDialog = (): void => setOpenDialog(false);
  const handleOpenModal = (): void => setOpenModal(true);
  const handleCloseModal = (): void => setOpenModal(false);

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field === 'editing' || params.field === 'books') {
      setCurrentAuthor(params.row);
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
      headerName: t('placeholders.firstName'),
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: t('placeholders.lastName'),
      flex: 1,
    },
    {
      field: 'birthDate',
      headerName: t('placeholders.birthDate'),
      flex: 1,
      valueFormatter: dateFormatter,
    },
    {
      field: 'country',
      headerName: t('placeholders.country'),
      flex: 1,
    },
    {
      field: 'books',
      headerName: t('placeholders.books'),
      flex: 1,
      renderCell: () => <AuthorBooks author={currentAuthor} />,
    },
    {
      field: 'editing',
      headerName: t('placeholders.editing'),
      flex: 1,
      renderCell: editingCell,
    },
  ];

  return (
    <div style={table.box}>
      {!authors.length ? (
        <Button onClick={clickHandler} aria-label='add' style={table.button}>
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
          onCellClick={cellClickHandler}
        />
      )}
      <ModalAuthorForm
        edit={edit}
        author={currentAuthor}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
      <AuthorDialog
        author={currentAuthor}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
}
