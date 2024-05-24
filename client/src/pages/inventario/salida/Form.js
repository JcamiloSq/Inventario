import React, { useEffect, useState } from 'react';
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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const validationSchema = Yup.object().shape({
    documentoReferencia: Yup.string().required('El documento de referencia es requerido'),
});

const initialState = {
    consecutivo: '',
    observacion: '',
    documentoReferencia: '',
    tipoDocumento: 'SALIDA',
    productos: [],
    table: []
}

let productosSelected = [];

export default function FormSalidaInventario() {

    const {id = null} = useParams();

    const { doGet, doPost, doPut } = useApi();
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

    useEffect(()=>{

        const init = async()=>{
            if (id) {
                const response = await doGet('salida/productos');
                const table = await doGet(`salida/productostable/${id}`)
                const data = await doGet(`${'salida'}/${id}`);
                const { IdDocumento, Proveedor, DocumentoReferencia, TipoDocumento, Observacion } = data;
                setState({
                    consecutivo: IdDocumento,
                    proveedor: Proveedor,
                    observacion: Observacion || '',
                    documentoReferencia: DocumentoReferencia,
                    tipoDocumento: TipoDocumento,
                    productos: response,
                    table: table
                })
            }
        };

        init();

    }, [doGet, id]);

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
            await doPut(`salida/${id}/createProductos`, {Productos: productosSelected});
            productosSelected = [];
            NotificationManager.success('Registros seleecionados correctamente');
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const OnSubmit = async (values) => {
        const data = {
            Proveedor: values.proveedor,
            DocumentoReferencia: values.documentoReferencia,
            TipoDocumento: values.tipoDocumento,
        }

        try {
            const response = await doPost('salida', data);
            NotificationManager.success('Registros creado correctamente');
            navigate(`${'/inventario/salida/edit'}/${response.IdDocumento}`, { replace: true })
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const aprobateDocument = async() => {
        try {
            await doPost(`salida/generarentrada/${id}`);
            NotificationManager.success('Inventario creado correctamente');
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

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
    ]

    const { proveedor, productos, consecutivo, observacion, documentoReferencia, table } = state;

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
            <Formik
                initialValues={{
                    proveedor,
                    productos,
                    consecutivo,
                    observacion,
                    documentoReferencia,
                    tipoDocumento: 'SALIDA',
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
                                        Entrada inventario
                                    </Typography>
                                    <Grid container spacing={2}  alignItems="flex-end">
                                        <Grid item xs={9}>
                                            <Button
                                                type='submit'
                                                variant="contained"
                                            >Guardar
                                            </Button>
                                        </Grid>
                                        {id && (<Grid item xs={2}>
                                            <Button
                                                onClick={() => aprobateDocument()}
                                                variant="contained"
                                            >Ejecutar ingreso
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
                                            <Field name="documentoReferencia" as={TextField}
                                                label="Documento referencia"
                                                helperText={touched.documentoReferencia && errors.documentoReferencia ? errors.documentoReferencia : ""}
                                                error={touched.documentoReferencia && Boolean(errors.documentoReferencia)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="tipoDocumento" as={TextField}
                                                label="Tipo documento"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Field name="observacion" as={TextField}
                                                fullWidth
                                                label="Observacion"
                                                type="text"
                                                margin="normal"
                                                variant="outlined"
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
                                                    <Button variant='outlined' onClick={openModalProducto} >Agregar productos</Button>
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



