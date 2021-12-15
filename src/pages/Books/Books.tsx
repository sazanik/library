import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from '../Authors/styles';
import {
  useAllAuthors,
  useAllBooks,
  useAppDispatch,
  useAppSelector,
} from '../../App/hooks';
import { authorsSelectors, store } from '../../App/store';
import BookDialog from '../../components/dialogs/Book/BookDialog';
import BookModal from '../../components/modals/Book/BookModal';
import { Actions, Fields } from '../../types/enums';
import { useNavigate } from 'react-router-dom';
import { IAuthor, IBook } from '../../types/inerfaces';
import { updateBook } from '../../features/books/booksSlice';

export default function Books(): ReactElement {
  const { t } = useTranslation('default');
  const navigate = useNavigate();
  const booksState = useAppSelector((state) => state.books);
  const authors = useAllAuthors();
  const [books, setBooks] = useState<IBook[]>(useAllBooks);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<IAuthor>(authors[0]);
  const [currentBook, setCurrentBook] = useState<IBook>(books[0]);

  const updateBooks = (): void => {
    authors.forEach((author) => {
      books.forEach((book) => {
        if (author.id === book.authorId) {
          const authorName = `${author.firstName} ${author.lastName}`;
          dispatch(
            updateBook({
              id: book.id,
              changes: { authorName },
            })
          );
        }
      });
    });
  };

  const cellClickHandler = (params: GridCellParams): void => {
    if (params.field !== Fields.Editing) return;
    const book: IBook = params.row;
    const author = authorsSelectors.selectById(store.getState(), book.authorId);
    setCurrentBook(book);
    if (!author) return;
    setCurrentAuthor(author);
  };

  const clickHandler = (event: MouseEvent<HTMLButtonElement>): void => {
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

  function editingCell(): ReactElement {
    return (
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
  }

  const openBook = (event: GridRenderCellParams): void => {
    navigate(`/books/${event.id}`);
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: t('placeholders.title'),
      flex: 1,
      renderCell: (params): ReactElement => (
        <Button style={styles.buttonLeft} onClick={() => openBook(params)}>
          {params.value}
        </Button>
      ),
    },
    {
      field: 'description',
      headerName: t('placeholders.description'),
      flex: 1,
    },
    {
      field: 'code',
      headerName: t('placeholders.code'),
      flex: 1,
    },
    {
      field: 'authorName',
      headerName: t('placeholders.authorName'),
      flex: 1,
    },
    {
      field: 'pagesCount',
      headerName: t('placeholders.pagesCount'),
      flex: 1,
    },
    {
      field: 'publishingYear',
      headerName: t('placeholders.publishingYear'),
      flex: 1,
    },
    {
      field: 'editing',
      headerName: t('placeholders.editing'),
      width: 120,
      renderCell: editingCell,
    },
  ];

  // eslint-disable-next-line
  useEffect(updateBooks, []);

  useEffect(() => {
    setBooks(useAllBooks);
  }, [booksState]);

  return (
    <div style={styles.box}>
      {!authors.length ? (
        <p>{t('infoBooks')}</p>
      ) : !books?.length ? (
        <Button onClick={clickHandler} aria-label='add' style={styles.button}>
          <AddIcon fontSize='large' color='primary' />
          {t('buttons.addBook')}
        </Button>
      ) : (
        <DataGrid
          rows={books}
          columns={columns}
          pageSize={13}
          rowsPerPageOptions={[13]}
          disableSelectionOnClick
          onCellClick={cellClickHandler}
        />
      )}
      <BookModal
        edit={edit}
        author={currentAuthor}
        book={currentBook}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <BookDialog
        book={currentBook}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}
