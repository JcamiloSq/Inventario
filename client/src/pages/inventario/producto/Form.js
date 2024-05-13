import React, { useState } from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, Toolbar } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import useApi from '../../../components/UseApi';
import SelectComponent from '../../../components/Select';


const validationSchema = Yup.object().shape({
    codigo: Yup.string().required('El Codigo es requerido'),
    descripcion: Yup.string().required('La descripcion es requerido'),
    precio: Yup.string().required('El precio es requerido')
});

const initialState = {
    codigo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    listCategoria: [],
}

export default function FormProducto() {
    const { doPost, doGet } = useApi();
    const [state, setPrevState] = useState(initialState);

    const setState = (dataState) => {
        setPrevState((prevState) => ({ ...prevState, ...dataState }));
      };

    React.useEffect(()=>{
        const init = async()=>{
            const response=await doGet('producto/categoria');
            console.log(response);
            setState({ listCategoria:response })
        };
        init();
    }, [doGet]);


    const onSubmit = async (values) => {
        try {
            console.log(values)
            const response = await doPost('producto', values);
            console.log(response);
        }  catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const {
        listCategoria
    } = state;

    return (
        <>
            <Formik
                initialValues={initialState}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, ...subProps }) => (
                    <FormikForm>
                        <Grid container justifyContent="flex-start" alignItems="flex-start" style={{ minHeight: '80vh', marginTop: '20px' }}>
                            <Grid item xs={10} sm={6} md={4} lg={14}>
                                <Paper elevation={20} style={{ width: 'auto', padding: '20px', marginLeft: '20px' }}>
                                    <Typography variant="h5" align="left" gutterBottom>
                                        Producto
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
                                            <Field name="codigo" as={TextField}
                                                fullWidth
                                                label="Codigo"
                                                type="text"
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="descripcion" as={TextField}
                                                fullWidth
                                                label="Descripcion"
                                                type="text"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Field
                                                label="Categoria"
                                                name="categoria"
                                                component={SelectComponent}
                                                items={listCategoria}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="precio" as={TextField}
                                                fullWidth
                                                label="Precio"
                                                type="text"
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
}



