import React, { useState } from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import useApi from '../../../components/UseApi';
import SelectComponent from '../../../components/Select';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';


const validationSchema = Yup.object().shape({
    proveedor: Yup.string().required('El proveedor es requerido'),
});

const initialState = {
    proveedor: '',
    consecutivo: '',
    observacion: '',
    productos: [],
}

const options = [
    { value: 'name', label: 'Name' },
    { value: 'code', label: 'ISO Code' },
    { value: 'population', label: 'Population' },
    { value: 'size', label: 'Size (km²)' },
];

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

function createData(name, code, population, size) {
    const density = population / size;
    return { id: name, name, code, population, size, density };
}


export default function FormEntradaInventario() {
    const { doGet } = useApi();
    const navigate = useNavigate();
    const [value, setValue] = useState('1');
    const [productModal, setProductoModal] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openModalProducto = () => setProductoModal(true);

    const closeModalProducto = () => {
        setProductoModal(false);
        setRowSelectionModel([]);
    };

    const crearProductoSeleccion = async (values) => {
        try {
            await doGet('login', values);
            navigate('/Dashboard');
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const OnSubmit = async (values) => {
        try {
            await doGet('login', values);
            navigate('/Dashboard');
        } catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    return (
        <>
            {productModal && (
                <Dialog open onClose={closeModalProducto} fullWidth maxWidth="lg">
                    <DialogTitle id="form-dialog-title">{"Productos"}</DialogTitle>
                    <DialogContent>
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
                            checkboxSelection
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disableElevation
                            variant="contained"
                            color="primary"
                        >
                            Seleccionar

                        </Button>
                        <Button disableElevation color="primary" onClick={closeModalProducto}>Cancelar</Button>
                    </DialogActions>
                </Dialog>
            )}
            <Formik
                initialValues={initialState}
                onSubmit={OnSubmit}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, ...subProps }) => (
                    <FormikForm>
                        <Grid container justifyContent="flex-start" alignItems="flex-start" style={{ minHeight: '80vh', marginTop: '20px' }}>
                            <Grid item xs={10} sm={6} md={4} lg={14}>
                                <Paper elevation={20} style={{ width: 'auto', padding: '20px', marginLeft: '20px' }}>
                                    <Typography variant="h5" align="left" gutterBottom>
                                        Entrada inventario
                                    </Typography>
                                    <Grid item xs={12}>
                                        <Button
                                            type='submit'
                                            variant="contained"
                                        >Guardar</Button>
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
                                        <Grid item xs={3}>
                                            <Field
                                                label="Proveedor"
                                                name="proveedor"
                                                component={SelectComponent}
                                                items={options}
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
                                    <Box sx={{ width: '100%', typography: 'body1' }}>
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
                                            </TabPanel>
                                        </TabContext>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
}



