import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  GridSortModel,
} from '@mui/x-data-grid';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorsCollection } from '../../store/authors/asyncActions';
import { setPage as setAuthorsPage } from '../../store/authors/authorsSlice';
import { getBooksCollection } from '../../store/books/asyncActions';
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
      count: authors.collectionSize,
      setPage: setAuthorsPage,
      getCollection: getAuthorsCollection,
    },
    books: {
      page: books.page,
      count: books.collectionSize,
      setPage: setBooksPage,
      getCollection: getBooksCollection,
    },
  };

  const dispatch = useAppDispatch();
  const [currentRows, setCurrentRows] = React.useState<GridRowsProp>(rows);
  const [pageSize, setPageSize] = useState<number>(0);
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: columns[0].field,
      sort: null,
    },
  ]);

  const handlePageChange = async (newPage: number): Promise<void> => {
    await dispatch(state[entity].getCollection(pageSize) as never);
    dispatch(state[entity].setPage(newPage));
  };

  const handleSortModelChange = (newModel: GridSortModel): void => {
    console.log(newModel);
    setSortModel(newModel);
    //const newRows = dispatch(getServerSortRows(sortModel, page, pageSize))
    // setCurrentRows(newRows);
  };

  return (
    <DataGrid
      rows={currentRows}
      columns={columns}
      disableColumnMenu
      autoPageSize
      page={state[entity].page}
      onPageChange={handlePageChange}
      rowCount={state[entity].count}
      sortModel={sortModel}
      sortingMode='server'
      onPageSizeChange={(value) => setPageSize(value)}
      onSortModelChange={handleSortModelChange}
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
