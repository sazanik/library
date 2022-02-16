import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction } from 'react-i18next';

interface RenderCells {
  [key: string]: (params: GridRenderCellParams) => JSX.Element;
}

export const getColumns = (t: TFunction, renderCells: RenderCells): GridColDef[] => {
  const { renderTitleCells, renderEditingCell } = renderCells;

  return [
    {
      field: 'title',
      headerName: t('placeholders:title'),
      flex: 1,
      renderCell: renderTitleCells,
    },
    {
      field: 'description',
      headerName: t('placeholders:description'),
      flex: 1,
    },
    {
      field: 'code',
      headerName: t('placeholders:code'),
      flex: 1,
    },
    {
      field: 'authorName',
      headerName: t('placeholders:author'),
      flex: 1,
    },
    {
      field: 'pagesCount',
      headerName: t('placeholders:pagesCount'),
      flex: 1,
    },
    {
      field: 'publishingYear',
      headerName: t('placeholders:publishingYear'),
      flex: 1,
    },
    {
      field: 'editing',
      headerName: t('placeholders:editing'),
      width: 120,
      renderCell: renderEditingCell,
      sortable: false,
    },
  ];
};
