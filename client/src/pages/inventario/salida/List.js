import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useApi from '../../../components/UseApi';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

const initialState = {
  data: [],
  idDelete: '',
  openModalDelete: false,
};

export default function ListSalidaInventario() {
  const [state, setPrevState] = useState(initialState);

  const { doGet } = useApi();

  const setState = (dataState) => {
    setPrevState((prevState) => ({ ...prevState, ...dataState }));
  };

  const init = useCallback(async () => {
    try {
      const respuestaRol = await doGet('salida');
      setState({ data: respuestaRol });
    } catch (error) {
      NotificationManager.error(error.message);
    }
  }, [doGet]);

  useEffect(() => {
    init();
  }, [init]);

  const columns = [
    { field: 'IdDocumento', headerName: 'Consecutivo salida', flex: 1, minWidth: 100 },
    { field: 'DocumentoReferencia', headerName: 'Documento referencia', flex: 1, minWidth: 180 },
    { field: 'TipoDocumento', headerName: 'Tipo de documento', flex: 1, minWidth: 180 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 180,
      getActions: (params) => [
          <Link to={`${'/inventario/salida/edit'}/${params.row.IdDocumento}`}>
            <GridActionsCellItem icon={<EditIcon />} label="Edit" />
          </Link>
      ],
    },
  ];

  const { data } = state;
  const rows = data;

  return (
    <>
      <Paper sx={{ height: 700, width: '95%' }}>
        <Link to="/inventario/salida/form">
          <Button variant="contained">Crear</Button>
        </Link>
        <DataGrid
          getRowId={(rows) => rows.IdDocumento}
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
        />
      </Paper>
    </>
  );
}
