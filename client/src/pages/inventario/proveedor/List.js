import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useApi from '../../../components/UseApi';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

const initialState = {
  data: [],
  idDelete: '',
  openModalDelete: false,
};

export default function ListProveedor() {
  const [state, setPrevState] = useState(initialState);

  const { doGet, doDelete } = useApi();

  const setState = (dataState) => {
    setPrevState((prevState) => ({ ...prevState, ...dataState }));
  };

  const init = useCallback(async () => {
    try {
      const respuesta = await doGet('proveedor');
      setState({ data: respuesta });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [doGet]);

  useEffect(() => {
    init();
  }, [init]);

  const openDelete = (row) =>
    setState({ idDelete: row.IdProveedor, openModalDelete: true });
  const closeDelete = () => setState({ idDelete: '', openModalDelete: false });

  const deleteRegister = async () => {
    const { idDelete } = state;

    try {
      await doDelete(`${'proveedor'}/${idDelete}`);
      closeDelete();
      init();
      NotificationManager.success('Registro eliminado correctamente');
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const columns = [
    { field: 'Nombre', headerName: 'Nombre Proveedor', flex: 1, minWidth: 180 },
    { field: 'Nit', headerName: 'Nit', flex: 1, minWidth: 180 },
    { field: 'Telefono', headerName: 'Telefono', flex: 1, minWidth: 180 },
    { field: 'Email', headerName: 'Correo', flex: 1, minWidth: 180 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 180,
      getActions: (params) => [
        <>
          <Link to={`${'/inventario/proveedor/edit'}/${params.row.IdProveedor}`}>
            <GridActionsCellItem icon={<EditIcon />} label="Edit" />
          </Link>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => openDelete(params.row)}
          />
        </>,
      ],
    },
  ];

  const { data, openModalDelete } = state;
  const rows = data;

  return (
    <>
      {openModalDelete && (
        <>
          <Dialog open onClose={closeDelete} fullWidth maxWidth="xs">
            <DialogContent>
              <DialogTitle id="alert-dialog-title">
                {'¿ Esta seguro de eliminar este registro?'}
              </DialogTitle>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDelete} variant="contained">
                Cancelar
              </Button>
              <Button onClick={deleteRegister} autoFocus variant="contained">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <Paper sx={{ height: 700, width: '95%' }}>
        <Link to="/inventario/proveedor/form">
          <Button variant="contained">Crear</Button>
        </Link>
        <DataGrid
          getRowId={(rows) => rows.IdProveedor}
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
    </>
  );
}