import React, { useState } from 'react';
import {
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AuthorDialog } from '../../components/Author/Dialog/AuthorDialog';
import { AuthorModal } from '../../components/Author/Modal/AuthorModal';
import { Actions, Entities, Fields } from '../../types/enums';
import { useNavigate } from 'react-router-dom';
import { AuthorProps } from '../../types/inerfaces';
import { useAllAuthors, useAppSelector } from '../../hooks';
import { Loader } from '../../components/Loader/Loader';
import { Table } from '../../components/Table/Table';
import { styles } from './ScreensAuthorsList.styles';
import { BookSelect } from '../../components/Book/Select/BookSelect';

export const ScreensAuthorsList = (): JSX.Element => {
  const { t } = useTranslation('default');
  const { loading } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const authors = useAllAuthors();
  const [currentAuthor, setCurrentAuthor] = useState<AuthorProps>(authors[0]);
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field === Fields.Editing || params.field === Fields.Books) {
      setCurrentAuthor(params.row);
    }
  };

  const clickHandler = (event: {
    currentTarget: { ariaLabel: string };
  }): void => {
    const action: string = event.currentTarget.ariaLabel;
    switch (action) {
      case Actions.Add:
        setEdit(false);
        setOpenModal(true);
        break;

      case Actions.Edit:
        setEdit(true);
        setOpenModal(true);
        break;

      case Actions.Delete:
        setOpenDialog(true);
        break;

      default:
        break;
    }
  };

  const editingCell = (): JSX.Element => (
    <>
      <IconButton onClick={clickHandler} aria-label='edit'>
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton onClick={clickHandler} aria-label='delete'>
        <DeleteIcon fontSize='small' color='error' />
      </IconButton>
    </>
  );

  const openAuthor = (params: GridRenderCellParams): void => {
    navigate(`/authors/${params.id}`);
  };

  const renderNameCells = (params: GridRenderCellParams): JSX.Element => (
    <Button sx={styles.buttonLeft} onClick={() => openAuthor(params)}>
      {params.value}
    </Button>
  );

  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: t('placeholders:firstName'),
      flex: 1,
      renderCell: renderNameCells,
    },
    {
      field: 'lastName',
      headerName: t('placeholders:lastName'),
      flex: 1,
      renderCell: renderNameCells,
    },
    {
      field: 'birthDate',
      headerName: t('placeholders:birthDate'),
      flex: 1,
    },
    {
      field: 'country',
      headerName: t('placeholders:country'),
      flex: 1,
    },
    {
      field: 'books',
      headerName: t('placeholders:books'),
      flex: 0.7,
      renderCell: () => <BookSelect author={currentAuthor} />,
    },
    {
      field: 'editing',
      headerName: t('placeholders:editing'),
      flex: 0.5,
      renderCell: editingCell,
    },
  ];
  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={styles.box}>
      {!authors.length ? (
        <Button onClick={clickHandler} aria-label='add' sx={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons:addAuthor')}
        </Button>
      ) : (
        <Table
          entity={Entities.Author}
          rows={authors}
          columns={columns}
          onCellClick={cellClickHandler}
          setEdit={setEdit}
          setOpenModal={setOpenModal}
        />
      )}
      <AuthorModal
        edit={edit}
        author={currentAuthor}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <AuthorDialog
        author={currentAuthor}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Box>
  );
};
