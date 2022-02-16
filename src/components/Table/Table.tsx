import { DataGrid, GridCellParams, GridColDef, GridSortModel } from '@mui/x-data-grid';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorsCollection, getAuthorsSortedCollection } from '../../store/authors/asyncActions';
import { setAuthorsPage } from '../../store/authors/authorsSlice';
import { getBooksCollection, getBooksSortedCollection } from '../../store/books/asyncActions';
import { setBooksPage } from '../../store/books/booksSlice';
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
      isLoading: authors.isLoading,
      setPage: setAuthorsPage,
      getCollection: getAuthorsCollection,
      getSortedCollection: getAuthorsSortedCollection,
      sortModel: authors.sortModel,
      sortedList: authors.sortedList,
    },
    books: {
      page: books.page,
      count: books.collectionSize,
      setPage: setBooksPage,
      isLoading: books.isLoading,
      getCollection: getBooksCollection,
      getSortedCollection: getBooksSortedCollection,
      sortModel: books.sortModel,
      sortedList: books.sortedList,
    },
  };

  const dispatch = useAppDispatch();
  const [pageSize, setPageSize] = useState<number>(0);

  const handleSortModelChange = async (newModel: GridSortModel, page?: number): Promise<void> => {
    const data = {
      field: newModel[0]?.field as FieldsList,
      pageSize,
      page: state[entity].page,
      sort: newModel[0]?.sort as Sort,
    };

    if (!newModel.length) {
      data.field = state[entity].sortModel[0].field as FieldsList;
      data.sort = undefined;
    }

    if (page) {
      data.page = page;
    }

    await dispatch(state[entity].getSortedCollection(data));
  };

  const handlePageChange = async (newPage: number): Promise<void> => {
    if (state[entity].sortModel[0].sort) {
      await dispatch(state[entity].setPage(newPage));
      return handleSortModelChange(state[entity].sortModel, state[entity].page + 1);
    } else {
      await dispatch(state[entity].getCollection(pageSize) as never);
    }
    await dispatch(state[entity].setPage(newPage));
  };

  return (
    <DataGrid
      rows={state[entity].sortModel[0].sort ? (state[entity].sortedList as AuthorProps[]) : rows}
      columns={columns}
      disableColumnMenu
      autoPageSize
      page={state[entity].page}
      onPageChange={handlePageChange}
      rowCount={state[entity].count}
      sortModel={state[entity].sortModel}
      sortingMode='server'
      onPageSizeChange={setPageSize}
      onSortModelChange={(model) => handleSortModelChange(model)}
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
