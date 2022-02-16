import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction } from 'react-i18next';

import { Fields } from '../../types/enums';

interface RenderCells {
  [key: string]: (params: GridRenderCellParams) => JSX.Element;
}

export const getColumns = (t: TFunction, renderCells: RenderCells): GridColDef[] => {
  const { renderTitleCells, renderEditingCell } = renderCells;

  return [
    {
      field: Fields.TITLE,
      headerName: t('placeholders:title'),
      flex: 1,
      renderCell: renderTitleCells,
    },
    {
      field: Fields.DESCRIPTION,
      headerName: t('placeholders:description'),
      flex: 1,
      sortable: false,
    },
    {
      field: Fields.CODE,
      headerName: t('placeholders:code'),
      flex: 1,
    },
    {
      field: Fields.AUTHOR,
      headerName: t('placeholders:author'),
      flex: 1,
    },
    {
      field: Fields.PAGES_COUNT,
      headerName: t('placeholders:pagesCount'),
      flex: 1,
    },
    {
      field: Fields.PUBLISHING_YEAR,
      headerName: t('placeholders:publishingYear'),
      flex: 1,
    },
    {
      field: Fields.EDITING,
      headerName: t('placeholders:editing'),
      width: 120,
      renderCell: renderEditingCell,
      sortable: false,
    },
  ];
};
