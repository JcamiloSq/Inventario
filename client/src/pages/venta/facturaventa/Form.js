import React, { useCallback, useEffect, useState } from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../../../components/UseApi';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';


const validationSchema = Yup.object().shape({
    cliente: Yup.string().required('El proveedor es requerido'),
    documentoReferencia: Yup.string().required('El documento de referencia es requerido'),
    correo: Yup.string().email('El correo no es un correo valido').required('El documento de referencia es requerido'),
});

const initialState = {
    cliente: '',
    consecutivo: '',
    observacion: '',
    documentoReferencia: '',
    productos: [],
    table: [],
    isEstado: false,
    estado: '',
    openModalDelete: false,
    correo: '',
}

let productosSelected = [];

export default function FormFacturaVenta() {

    const {id = null} = useParams();

    const { doGet, doPost, doPut, doDelete } = useApi();
    const navigate = useNavigate();
    const [value, setValue] = useState('1');
    const [state, setPrevState] = useState(initialState);
    const [productModal, setProductoModal] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const setState = (dataState) => {
        setPrevState((prevState) => ({ ...prevState, ...dataState }));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openModalProducto = () => setProductoModal(true);

    const closeModalProducto = () => {
        setProductoModal(false);
        setRowSelectionModel([]);
    };

    const selectedModalProducto = async () => {
        const selectedData = productos.filter((row) =>
            rowSelectionModel.includes(row.id)
        );
        productosSelected = selectedData;
        await crearProductoSeleccion();
        setProductoModal(false);
        setRowSelectionModel([]);
    };

    const init = useCallback(async()=>{
        if (id) {
            const response = await doGet(`facturaventa/productos/${id}`);
            const table = await doGet(`facturaventa/productostable/${id}`)
            console.log(response, table);
            const data = await doGet(`facturaventa/${id}`);
            const { IdDocumento, Cliente, DocumentoReferencia, Observacion, Estado, Correo } = data;
            setState({
                consecutivo: IdDocumento,
                cliente: Cliente,
                observacion: Observacion || '',
                documentoReferencia: DocumentoReferencia,
                productos: response,
                table: table,
                isEstado: Estado === 'EJECUTADO',
                correo: Correo,
            })
        }
    }, [doGet, id]);

    useEffect(()=>{
        init();

    }, [init]);

    const processRowUpdate = (newRow, oldRow) => {
        const updatedRows = productos.map((row) => {
            if (row.id === oldRow.id) {
                return { ...row, ...newRow };
            }
            return row;
        });
        setState({ ...state, productos: updatedRows });
        return newRow;
    };


    const crearProductoSeleccion = async () => {
        try {
            await doPut(`facturaventa/${id}/createProductos`, {Productos: productosSelected});
            productosSelected = [];
            NotificationManager.success('Registros seleecionados correctamente');
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const OnSubmit = async (values) => {
        const data = {
            Cliente: values.cliente,
            DocumentoReferencia: values.documentoReferencia,
            TipoDocumento: values.tipoDocumento,
            Observacion: values.observacion,
            Estado: values.estado === 'APROBADO' ? 'APROBADO' : 'PENDIENTE',
            Correo: values.correo,
        }

        try {
            const method = id ? doPut : doPost;
            const message = id ? 'Registro actualizado correctamente' : 'Registro creado correctamente';
            const response = await method(`facturaventa/${id || ''}`, data);
            NotificationManager.success(message);
            navigate(`${'/venta/facturaventa/edit'}/${response.IdFacturaVenta}`, { replace: true })
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const aprobateDocument = async() => {
        try {
            await doPost(`facturaventa/generarsalida/${id}`);
            NotificationManager.success('Factura ejecutada correctamente');
            init();
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const openDelete = (row) =>
        setState({ idDelete: row.id, openModalDelete: true });

    const closeDelete = () => setState({ idDelete: '', openModalDelete: false });

    const deleteRegister = async () => {
        const { idDelete } = state;
        try {
          await doDelete(`facturaventa/eliminartable/${idDelete}`);
          closeDelete();
          init();
          NotificationManager.success('Registro eliminado correctamente');
        } catch (error) {
          NotificationManager.error(error.message);
        }
      };

    const columnsProducto = [
        { field: 'codigo', headerName: 'Codigo producto', flex: 1, minWidth: 180 },
        { field: 'descripcion', headerName: 'Descripcion producto', flex: 1, minWidth: 180 },
        { field: 'precioUnidad', headerName: 'Precio unidad', flex: 1, minWidth: 180 },
        { field: 'cantidad', headerName: 'Cantidad', flex: 1, minWidth: 180, editable: true, type: 'number' },
        { field: 'categoria', headerName: 'Categoria', flex: 1, minWidth: 180 },
    ]

    const columnsTable = [
        { field: 'codigo', headerName: 'Codigo producto', flex: 1, minWidth: 180 },
        { field: 'descripcion', headerName: 'Descripcion producto', flex: 1, minWidth: 180 },
        { field: 'precioUnidad', headerName: 'Precio unidad', flex: 1, minWidth: 180 },
        { field: 'cantidad', headerName: 'Cantidad', flex: 1, minWidth: 180, editable: true, type: 'number' },
        { field: 'precioTotal', headerName: 'Precio total', flex: 1, minWidth: 180 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 180,
            getActions: (params) => [
              <>
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    disabled={isEstado}
                    onClick={() => openDelete(params.row)}
                />
              </>,
            ],
          },
    ]

    const { cliente, productos, consecutivo, observacion, documentoReferencia, table, isEstado, openModalDelete, correo } = state;

    return (
        <>
            {productModal && (
                <Dialog open onClose={closeModalProducto} fullWidth maxWidth="lg">
                    <DialogTitle id="form-dialog-title">{"Productos"}</DialogTitle>
                    <DialogContent>
                        <DataGrid
                            rows={productos}
                            columns={columnsProducto}
                            pageSize={10}
                            initialState={{
                                ...productos.initialState,
                                pagination: { paginationModel: { pageSize: 10 } },
                            }}
                            pageSizeOptions={[10, 30, 60]}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            checkboxSelection
                            processRowUpdate={processRowUpdate}
                            onRowSelectionModelChange={(newSelectionModel) => {
                                setRowSelectionModel(newSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disableElevation
                            variant="contained"
                            color="primary"
                            onClick={selectedModalProducto}
                        >
                            Seleccionar

                        </Button>
                        <Button disableElevation color="primary" onClick={closeModalProducto}>Cancelar</Button>
                    </DialogActions>
                </Dialog>
            )}
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
            <Formik
                initialValues={{
                    cliente,
                    productos,
                    consecutivo,
                    observacion,
                    documentoReferencia,
                    correo,
                }}
                onSubmit={OnSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
            >
                {({touched, errors}) => (
                    <FormikForm>
                        <Grid container justifyContent="flex-start" alignItems="flex-start" style={{ minHeight: '80vh', marginTop: '20px' }}>
                            <Grid item xs={10} sm={6} md={4} lg={14}>
                                <Paper elevation={20} style={{ width: 'auto', padding: '20px', marginLeft: '20px' }}>
                                    <Typography variant="h5" align="left" gutterBottom>
                                        Factura de venta
                                    </Typography>
                                    <Grid container spacing={2}  alignItems="flex-end">
                                        <Grid item xs={9}>
                                            <Button
                                                type='submit'
                                                variant="contained"
                                                disabled={isEstado}
                                            >Guardar
                                            </Button>
                                        </Grid>
                                        {id && (<Grid item xs={2}>
                                            <Button
                                                onClick={() => aprobateDocument()}
                                                variant="contained"
                                                disabled={isEstado}
                                            >Ejecutar factura
                                            </Button>
                                        </Grid>
                                        )}
                                    </Grid>
                                    <Toolbar />
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item xs={2}>
                                            <Field name="consecutivo" as={TextField}
                                                fullWidth
                                                disabled
                                                label="Consecutivo"
                                                type="text"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="cliente" as={TextField}
                                                label="Cliente"
                                                disabled={isEstado}
                                                helperText={touched.cliente && errors.cliente ? errors.cliente : ""}
                                                error={touched.cliente && Boolean(errors.cliente)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="documentoReferencia" as={TextField}
                                                label="Documento referencia"
                                                disabled={isEstado}
                                                helperText={touched.documentoReferencia && errors.documentoReferencia ? errors.documentoReferencia : ""}
                                                error={touched.documentoReferencia && Boolean(errors.documentoReferencia)}
                                            />
                                        </Grid>
                                        <Grid item xs={2} lg={5}>
                                            <Field name="correo" as={TextField}
                                                label="Correo"
                                                disabled={isEstado}
                                                helperText={touched.correo && errors.correo ? errors.correo : ""}
                                                error={touched.correo && Boolean(errors.correo)}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Field name="observacion" as={TextField}
                                                fullWidth
                                                label="Observacion"
                                                type="text"
                                                margin="normal"
                                                variant="outlined"
                                                disabled={isEstado}
                                                multiline
                                            />
                                        </Grid>
                                    </Grid>
                                    {id && (<Box sx={{ width: '100%', typography: 'body1' }}>
                                        <TabContext value={value}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                    <Tab label="Productos" value="1" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1">
                                                <Paper sx={{ height: 700, width: '95%' }}>
                                                    <Button variant='outlined' onClick={openModalProducto} disabled={isEstado} >Agregar productos</Button>
                                                    <DataGrid
                                                        rows={table}
                                                        columns={columnsTable}
                                                        pageSize={10}
                                                        initialState={{
                                                            ...table.initialState,
                                                            pagination: { paginationModel: { pageSize: 10 } },
                                                        }}
                                                        pageSizeOptions={[10, 30, 60]}
                                                        components={{
                                                            Toolbar: GridToolbar,
                                                        }}
                                                        disableSelectionOnClick
                                                    />
                                                </Paper>
                                            </TabPanel>
                                        </TabContext>
                                    </Box>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
}



