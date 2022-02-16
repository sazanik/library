import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TFunction } from 'react-i18next';

import { Fields } from '../../types/enums';

interface RenderCells {
  [key: string]: (params: GridRenderCellParams) => JSX.Element;
}

export const getColumns = (t: TFunction, renderCells: RenderCells): GridColDef[] => {
  const { renderBooksCells, renderEditingCells, renderNameCells } = renderCells;

  return [
    {
      field: Fields.FIRST_NAME,
      headerName: t('placeholders:firstName'),
      flex: 1,
      renderCell: renderNameCells,
    },
    {
      field: Fields.LAST_NAME,
      headerName: t('placeholders:lastName'),
      flex: 1,
      renderCell: renderNameCells,
    },
    {
      field: Fields.BIRTH_DATE,
      headerName: t('placeholders:birthDate'),
      flex: 1,
      type: 'date',
    },
    {
      field: Fields.COUNTRY,
      headerName: t('placeholders:country'),
      flex: 1,
    },
    {
      field: Fields.BOOKS,
      headerName: t('placeholders:books'),
      flex: 0.7,
      renderCell: renderBooksCells,
      sortable: false,
    },
    {
      field: Fields.EDITING,
      headerName: t('placeholders:editing'),
      flex: 0.5,
      renderCell: renderEditingCells,
      sortable: false,
    },
  ];
};
