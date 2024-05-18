import * as React from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 10 },
  { field: 'code', headerName: 'ISO Code', flex: 1, minWidth: 180 },
  { field: 'population', headerName: 'Population', type: 'number', flex: 1, minWidth: 180 },
  { field: 'size', headerName: 'Size (km²)', type: 'number', flex: 1, minWidth: 180 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 180,
    getActions: () => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
 },
];


const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }}/>
    </GridToolbarContainer>
  );
}

function createData(name, code, population, size) {
  const density = population / size;
  return { id: name, name, code, population, size, density };
}

export default function EnhancedTable() {
  return (
    <Paper sx={{ height: 700, width: '95%' }}>
      <Button variant='contained' >Crear</Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        initialState={{
          ...rows.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 30, 60]}
        components={{
          Toolbar: GridToolbar,
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        disableSelectionOnClick
      />
    </Paper>
  );
}
