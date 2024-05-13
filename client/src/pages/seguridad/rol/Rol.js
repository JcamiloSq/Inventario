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
import useApi from '../../../components/UseApi';

const valoresIniciales = {
  data: [],
};

const columns = [
  { field: 'IdRol', headerName: 'IdRol', flex: 1, minWidth: 10 },
  { field: 'NombreRol', headerName: 'NombreRol', flex: 1, minWidth: 180 },
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

export default function ListRol() {
  const [state, setState] = React.useState(valoresIniciales);

  const { doGet } = useApi();

  React.useEffect(() => {
    const init = async () => {
      try {
        const respuestaRol = await doGet('controladorRol');
        setState({ data: respuestaRol });
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const { data } = state;
  const rows = data;

  return (
    <Paper sx={{ height: 700, width: '95%' }}>
      <Button variant="contained">Crear</Button>
      <DataGrid
        getRowId={(rows) => rows.IdRol}
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
        // slots={{
        //   toolbar: CustomToolbar,
        // }}
        disableSelectionOnClick
      />
    </Paper>
  );
}
