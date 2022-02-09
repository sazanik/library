import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSortModel,
} from '@mui/x-data-grid';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCollectionAuthors } from '../../store/authors/asyncActions';
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
  const [pageSize, setPageSize] = useState<number>(0);
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: columns[0].field,
      sort: 'asc',
    },
  ]);

  const handlePageChange = (newPage: number): void => {
    dispatch(getCollectionAuthors(pageSize)).then(() => {
      dispatch(state[entity].setPage(newPage));
    });
  };

  console.log(pageSize);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      autoPageSize
      page={state[entity].page}
      onPageChange={handlePageChange}
      // sortingMode='server'
      sortModel={sortModel}
      // paginationMode='server'
      onPageSizeChange={(count) => setPageSize(count)}
      onSortModelChange={(newModel) => setSortModel(newModel)}
      components={{
        Toolbar: () =>
          TableToolbar({
            buttonTitle,
            setIsEdit,
            setIsOpenModal,
          }),
      }}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
