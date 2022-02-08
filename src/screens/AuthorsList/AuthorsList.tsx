import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton } from '@mui/material';
import {
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AuthorDialog } from '../../components/Author/Dialog/AuthorDialog';
import { AuthorModal } from '../../components/Author/Modal/AuthorModal';
import { BookSelect } from '../../components/Book/Select/BookSelect';
import { Loader } from '../../components/Loader/Loader';
import { Table } from '../../components/Table/Table';
import { useAllAuthors, useAppDispatch, useAppSelector } from '../../hooks';
import { checkLoading } from '../../services/checkLoading';
import { setLoading } from '../../store/app/appSlice';
import { Actions, Fields } from '../../types/enums';
import { AuthorProps } from '../../types/inerfaces';
import { styles } from './AuthorsList.styles';

export const AuthorsList = (): JSX.Element => {
  const { t } = useTranslation();
  const { generalLoading, generalError } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const authors = useAllAuthors();
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state);
  const [currentAuthor, setCurrentAuthor] = useState<AuthorProps>(authors[0]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field === Fields.EDITING || params.field === Fields.BOOKS) {
      setCurrentAuthor(params.row);
    }
  };

  const clickHandler = (event: {
    currentTarget: { ariaLabel: string };
  }): void => {
    const action: string = event.currentTarget.ariaLabel;
    switch (action) {
      case Actions.ADD:
        setIsEdit(false);
        setIsOpenModal(true);
        break;

      case Actions.EDIT:
        setIsEdit(true);
        setIsOpenModal(true);
        break;

      case Actions.DELETE:
        setIsOpenDialog(true);
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
      type: 'date',
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
      sortable: false,
    },
    {
      field: 'editing',
      headerName: t('placeholders:editing'),
      flex: 0.5,
      renderCell: editingCell,
      sortable: false,
    },
  ];

  useEffect(() => {
    if (generalError) {
      setIsOpenModal(true);
    }
  }, [generalError]);

  useEffect(() => {
    if (store.app.generalLoading === checkLoading()) {
      return;
    }
    dispatch(setLoading(checkLoading()));
    //eslint-disable-next-line
  }, [store.authors.loading, store.books.loading, store.users.loading]);

  if (generalLoading) {
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
          buttonTitle={t('buttons:addAuthor')}
          rows={authors}
          columns={columns}
          onCellClick={cellClickHandler}
          setIsEdit={setIsEdit}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      <AuthorModal
        isEdit={isEdit}
        author={currentAuthor}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <AuthorDialog
        author={currentAuthor}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
    </Box>
  );
};
