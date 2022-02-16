import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction } from 'react-i18next';

interface RenderCells {
  [key: string]: (params: GridRenderCellParams) => JSX.Element;
}

export const getColumns = (t: TFunction, renderCells: RenderCells): GridColDef[] => {
  const { renderBooksCells, renderEditingCells, renderNameCells } = renderCells;

  return [
    {
      field: 'firstName',
      headerName: t('placeholders:firstName'),
      flex: 1,
      renderCell: renderNameCells,
    },
    {
      field: 'lastName',
      headerName: t('placeholders:lastName'),
      flex: 1,
      renderCell: renderNameCells,
    },
    {
      field: 'birthDate',
      headerName: t('placeholders:birthDate'),
      flex: 1,
      type: 'date',
    },
    {
      field: 'country',
      headerName: t('placeholders:country'),
      flex: 1,
    },
    {
      field: 'books',
      headerName: t('placeholders:books'),
      flex: 0.7,
      renderCell: renderBooksCells,
      sortable: false,
    },
    {
      field: 'editing',
      headerName: t('placeholders:editing'),
      flex: 0.5,
      renderCell: renderEditingCells,
      sortable: false,
    },
  ];
};
