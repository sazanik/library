import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { GridCellParams, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BookDialog } from '../../components/Book/Dialog/BookDialog';
import { BookModal } from '../../components/Book/Modal/BookModal';
import { Loader } from '../../components/Loader/Loader';
import { Table } from '../../components/Table/Table';
import { useAllAuthors, useAllBooks, useAppDispatch, useAppSelector } from '../../hooks';
import { setIsGeneralLoading } from '../../store/app/appSlice';
import { getAuthorsCollection } from '../../store/authors/asyncActions';
import { authorsSelectors } from '../../store/authors/selectors';
import { getBooksCollection, getBooksCollectionSize } from '../../store/books/asyncActions';
import { Entities, Fields } from '../../types/enums';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { checkLoading } from '../../utils/checkLoading';
import { styles } from './BooksList.styles';
import { getColumns } from './columns';

export const BooksList = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = useAppSelector((state) => state);
  const { isGeneralLoading, generalError } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const authors = useAllAuthors();
  const books = useAllBooks();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<AuthorProps>(authors[0]);
  const [currentBook, setCurrentBook] = useState<BookProps>(books[0]);

  const openBook = (event: GridRenderCellParams): void => {
    navigate(`/books/${event.id}`);
  };

  const handlerClickAddBook = (): void => {
    setIsEdit(false);
    setIsOpenModal(true);
  };

  const cellClickHandler = ({ field, row }: GridCellParams): void => {
    if (field !== Fields.EDITING) {
      return;
    }

    const book: BookProps = row;
    const author = authorsSelectors.selectById(store, book.authorId);

    setCurrentBook(book);
    setCurrentAuthor(author!);
  };

  const renderEditingCell = (): JSX.Element => {
    return (
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
  };

  const renderTitleCells = (params: GridRenderCellParams): JSX.Element => {
    const { value } = params;

    return (
      <Button sx={styles.buttonLeft} onClick={() => openBook(params)}>
        {value}
      </Button>
    );
  };

  const columns = getColumns(t, {
    renderTitleCells,
    renderEditingCell,
  });

  const booksWithAuthors = (): BookProps[] => {
    return books.map((book) => {
      const author = authorsSelectors.selectById(store, book.authorId);
      const authorName = `${author?.firstName} ${author?.lastName}`;
      return {
        ...book,
        author: authorName,
      };
    });
  };

  useEffect(() => {
    dispatch(getBooksCollection());
  }, []);

  useEffect(() => {
    dispatch(getAuthorsCollection());
  }, [books]);

  useEffect(() => {
    dispatch(getBooksCollectionSize());
  }, [books]);

  useEffect(() => {
    if (generalError) {
      setIsOpenModal(true);
    }
  }, [generalError]);

  useEffect(() => {
    if (store.app.isGeneralLoading === checkLoading()) {
      return;
    }
    dispatch(setIsGeneralLoading(checkLoading()));
    //eslint-disable-next-line
  }, [store.authors.isLoading, store.books.isLoading, store.auth.isLoading]);

  if (isGeneralLoading) {
    return <Loader />;
  }

  return (
    <Box sx={styles.box}>
      {!authors.length && isGeneralLoading ? (
        <Typography>{t('glossary:infoBooks')}</Typography>
      ) : !books?.length ? (
        <Button onClick={handlerClickAddBook} sx={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons:addBook')}
        </Button>
      ) : (
        <Table
          entity={Entities.BOOKS}
          buttonTitle={t('buttons:addBook')}
          rows={booksWithAuthors()}
          columns={columns}
          onCellClick={cellClickHandler}
          setIsEdit={setIsEdit}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      <BookModal
        isEdit={isEdit}
        author={currentAuthor}
        book={currentBook}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <BookDialog
        book={currentBook}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
    </Box>
  );
};
