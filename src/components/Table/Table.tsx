import { DataGrid, GridCellParams, GridColDef, GridSortModel } from '@mui/x-data-grid';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorsCollection, getServerSortedRows } from '../../store/authors/asyncActions';
import { setPage as setAuthorsPage } from '../../store/authors/authorsSlice';
import { getBooksCollection } from '../../store/books/asyncActions';
import { setPage as setBooksPage } from '../../store/books/booksSlice';
import { Entities } from '../../types/enums';
import { AuthorProps, BookProps, FieldsList, Sort } from '../../types/inerfaces';
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
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(0);

  const handlePageChange = async (newPage: number): Promise<void> => {
    await dispatch(state[entity].getCollection(pageSize) as never);
    dispatch(state[entity].setPage(newPage));
  };

  const handleSortModelChange = (newModel: GridSortModel): void => {
    console.log(newModel);
    const data = {
      field: newModel[0]?.field as FieldsList,
      pageSize,
      page: state[entity].page,
      sort: newModel[0]?.sort as Sort,
    };

    if (!newModel.length) {
      data.field = authors.sortModel[0].field as FieldsList;
      data.sort = undefined;
    }

    console.log(data);

    dispatch(getServerSortedRows(data));
  };

  return (
    <DataGrid
      rows={authors.visibleList}
      columns={columns}
      disableColumnMenu
      autoPageSize
      page={state[entity].page}
      onPageChange={handlePageChange}
      rowCount={state[entity].count}
      sortModel={authors.sortModel}
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
      loading={loading}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
