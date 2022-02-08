import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSortModel,
} from '@mui/x-data-grid';
import React from 'react';

import { ROWS_COUNT } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPage as setAuthorsPage } from '../../store/authors/authorsSlice';
import { setPage as setBooksPage } from '../../store/books/booksSlice';
import { Entities } from '../../types/enums';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { TableToolbar } from './Toolbar/TableToolbar';

interface Props {
  entity: Entities;
  buttonTitle: string;
  rows: AuthorProps[] | BookProps[];
  columns: GridColDef[];
  onCellClick: (params: GridCellParams) => void;
  setIsEdit: (params: boolean) => void;
  setIsOpenModal: (params: boolean) => void;
}

export const Table = ({
  entity,
  rows,
  columns,
  onCellClick,
  buttonTitle,
  setIsEdit,
  setIsOpenModal,
}: Props): JSX.Element => {
  const { authors, books } = useAppSelector((state) => state);

  const state = {
    authors: {
      page: authors.page,
      setPage: setAuthorsPage,
    },
    books: {
      page: books.page,
      setPage: setBooksPage,
    },
  };

  const dispatch = useAppDispatch();
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: columns[0].field,
      sort: 'asc',
    },
  ]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      autoPageSize
      page={state[entity].page}
      onPageChange={(newPage) => dispatch(state[entity].setPage(newPage))}
      // sortingMode='server'
      sortModel={sortModel}
      onSortModelChange={(newModel) => setSortModel(newModel)}
      components={{
        Toolbar: () =>
          TableToolbar({
            buttonTitle,
            setIsEdit,
            setIsOpenModal,
          }),
      }}
      rowsPerPageOptions={[ROWS_COUNT]}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
