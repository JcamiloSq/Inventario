import React, { useCallback, useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import useApi from '../../../components/UseApi';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ConsultaInventario() {
  const { doGet } = useApi();
  const [rows, setRows] = useState([]);

  const init = useCallback(async()=>{
    const response = await doGet('consultainventario');
    setRows(response);
  }, [doGet]);

  useEffect(()=>{

    init();
  }, [init]);

  const columns = [
    { field: 'codigo', headerName: 'Codigo Producto', flex: 1, minWidth: 180 },
    { field: 'descripcion', headerName: 'Descripcion', flex: 1, minWidth: 180 },
    { field: 'categoria', headerName: 'Categoria', flex: 1, minWidth: 180 },
    { field: 'cantidad', headerName: 'Cantidad en stock', type: 'number', flex: 1, minWidth: 180 },
    { field: 'precio', headerName: 'Precio unitario', type: 'number', flex: 1, minWidth: 180 },
    { field: 'precioTotal', headerName: 'Precio total', type: 'number', flex: 1, minWidth: 180 },
    { field: 'proveedor', headerName: 'Proveedor', type: 'number', flex: 1, minWidth: 180 },
  ];


  return (
    <>

      <Paper sx={{ height: 700, width: '95%' }}>
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
    </>
  );
}
