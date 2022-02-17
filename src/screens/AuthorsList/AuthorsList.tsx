import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton } from '@mui/material';
import { GridCellParams, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AuthorDialog } from '../../components/Author/Dialog/AuthorDialog';
import { AuthorModal } from '../../components/Author/Modal/AuthorModal';
import { BookSelect } from '../../components/Book/Select/BookSelect';
import { Loader } from '../../components/Loader/Loader';
import { Table } from '../../components/Table/Table';
import { useAllAuthors, useAppDispatch, useAppSelector } from '../../hooks';
import { setLoading } from '../../store/app/appSlice';
import { Entities, Fields } from '../../types/enums';
import { AuthorProps } from '../../types/inerfaces';
import { checkLoading } from '../../utils/checkLoading';
import { styles } from './AuthorsList.styles';
import { getColumns } from './columns';

export const AuthorsList = (): JSX.Element => {
  const { t } = useTranslation();
  const { isGeneralLoading, generalError } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const authors = useAllAuthors();
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state);
  const [currentAuthor, setCurrentAuthor] = useState<AuthorProps>(authors[0]);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const openAuthor = (params: GridRenderCellParams): void => {
    navigate(`/authors/${params.id}`);
  };

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field === Fields.EDITING || params.field === Fields.BOOKS) {
      setCurrentAuthor(params.row);
    }
  };

  const handlerClickAddAuthor = (): void => {
    setIsEdit(false);
    setIsOpenModal(true);
  };

  const renderNameCells = (params: GridRenderCellParams): JSX.Element => {
    const { value } = params;

    return (
      <Button sx={styles.buttonLeft} onClick={() => openAuthor(params)}>
        {value}
      </Button>
    );
  };

  const renderBooksCells = (): JSX.Element => <BookSelect author={currentAuthor} />;

  const renderEditingCells = (): JSX.Element => (
    <>
      <IconButton
        onClick={() => {
          setIsEdit(true);
          setIsOpenModal(true);
        }}
      >
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton onClick={() => setIsOpenDialog(true)}>
        <DeleteIcon fontSize='small' color='error' />
      </IconButton>
    </>
  );

  const columns = getColumns(t, {
    renderNameCells,
    renderBooksCells,
    renderEditingCells,
  });

  useEffect(() => {
    if (generalError) {
      setIsOpenModal(true);
    }
  }, [generalError]);

  useEffect(() => {
    if (store.app.isGeneralLoading === checkLoading()) {
      return;
    }
    dispatch(setLoading(checkLoading()));
    //eslint-disable-next-line
  }, [store.authors.isLoading, store.books.isLoading, store.users.isLoading]);

  if (isGeneralLoading) {
    return <Loader />;
  }

  return (
    <Box sx={styles.box}>
      {!authors.length && isGeneralLoading ? (
        <Button onClick={handlerClickAddAuthor} sx={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons:addAuthor')}
        </Button>
      ) : (
        <Table
          entity={Entities.AUTHORS}
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
