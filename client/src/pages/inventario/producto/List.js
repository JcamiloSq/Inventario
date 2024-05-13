import React, { useCallback, useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useApi from '../../../components/UseApi';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

const initialState = {
  idDelete: '',
  openModalDelete: false
}

export default function ListProducto() {
  const { doGet, doDelete } = useApi();
  const [rows, setRows] = useState([]);
  const [state, setState] = useState(initialState);

  const openDelete = (row) => setState({ idDelete: row.IdProducto, openModalDelete: true });

  const closeDelete = () => setState({ idDelete: '', openModalDelete: false });

  const init = useCallback(async()=>{
    const response=await doGet('producto');
    setRows(response);
  }, [doGet]);

  useEffect(()=>{

    init();
  }, [init]);

  const columns = [
    { field: 'codigo', headerName: 'Codigo Producto', flex: 1, minWidth: 180 },
    { field: 'Descripcion', headerName: 'Descripcion', flex: 1, minWidth: 180 },
    { field: 'NombreCategoria', headerName: 'Categoria', flex: 1, minWidth: 180 },
    { field: 'Precio', headerName: 'Precio', type: 'number', flex: 1, minWidth: 180 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 180,
      getActions: (params) => [
        <>
        <Link to={`${'/inventario/producto/edit'}/${params.row.IdProducto}`}>
          <GridActionsCellItem icon={<EditIcon />} label="Edit" />
        </Link>
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => openDelete(params.row)}/>
        </>
      ],
   },
  ];

  const deleteRegister = async() => {
    const { idDelete } = state;

    try {
      await doDelete(`${'producto'}/${idDelete}`);
      closeDelete();
      init()
      NotificationManager.success('Registro eliminado correctamente');
    } catch(error) {
      NotificationManager.error(error.message);
    }
  }

  const { openModalDelete } = state;

  return (
    <>
      {openModalDelete && (
        <>
          <Dialog open onClose={closeDelete} fullWidth maxWidth="xs">
            <DialogContent>
              <DialogTitle id="alert-dialog-title">
                {"¿ Esta seguro de eliminar este registro?"}
              </DialogTitle>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDelete} variant='contained'>Cancelar</Button>
              <Button onClick={deleteRegister} autoFocus variant='contained'>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
      </>
      )}

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
    </>
  );
}
