import * as React from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useApi from '../../../components/UseApi';
import { Link } from 'react-router-dom';

const columns = [
  { field: 'codigo', headerName: 'Codigo Producto', flex: 1, minWidth: 180 },
  { field: 'Precio', headerName: 'Precio', type: 'number', flex: 1, minWidth: 180 },
  { field: 'Descripcion', headerName: 'Descripcion', flex: 1, minWidth: 180 },
  { field: 'NombreCategoria', headerName: 'Categoria', flex: 1, minWidth: 180 },
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

export default function ListProducto() {
  const { doGet } = useApi();
  const [rows, setRows]=React.useState([]);

  const init = React.useCallback(async()=>{
    const response=await doGet('producto');
    setRows(response);
  }, [doGet])


  React.useEffect(()=>{
    init();
  }, [init]);


  return (
    <Paper sx={{ height: 700, width: '95%' }}>
      <Link to="/inventario/producto/form">
        <Button variant='contained' >Crear</Button>
      </Link>
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
        disableSelectionOnClick
        getRowId={(row)=>row.IdProducto}
      />
    </Paper>
  );
}
