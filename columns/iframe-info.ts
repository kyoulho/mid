import type { ColDef, ColGroupDef } from 'ag-grid-community';

export const columns: ColDef[] | ColGroupDef[] = [
  {
    headerName: '키',
    field: 'key',
  },
  {
    headerName: 'URL',
    field: 'url',
  },
  {
    headerName: '설명',
    field: 'description',
  },
  {
    headerName: '생성일',
    field: 'createdAt',
  },
  {
    headerName: '수정일',
    field: 'updatedAt',
  },
];
