import React, { useState, useEffect } from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, Toolbar } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import useApi from '../../../components/UseApi';
import SelectComponent from '../../../components/Select';
import { useNavigate, useParams } from 'react-router-dom';


const validationSchema = Yup.object().shape({
    codigo: Yup.string().required('El Codigo es requerido'),
    descripcion: Yup.string().required('La descripcion es requerido'),
    precio: Yup.number().min(0).required('El precio es requerido'),
    categoria: Yup.string().required('La categoria es requerida')
});

const initialState = {
    codigo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    listCategoria: [],
}

export default function FormProducto() {

    const {id = null} = useParams();

    const { doPost, doGet, doPut } = useApi();
    const [state, setPrevState] = useState(initialState);
    const navigate = useNavigate();

    const setState = (dataState) => {
        setPrevState((prevState) => ({ ...prevState, ...dataState }));
      };

    useEffect(()=>{

        const init = async()=>{
            const response = await doGet('producto/categoria');
            if (id) {
                const data = await doGet(`${'producto'}/${id}`);
                const { codigo, Descripcion, Precio, IdCategoria } = data;
                setState({
                    codigo: codigo,
                    descripcion: Descripcion,
                    precio: Precio,
                    categoria: IdCategoria,
                })
            }
            setState({ listCategoria: response })
        };

        init();

    }, [doGet, id]);


    const onSubmit = async (values) => {
        const data = {
            codigo: values.codigo,
            Descripcion: values.descripcion,
            Precio: values.precio,
            IdCategoria: values.categoria,
        }

        const method = id ? doPut : doPost;

        const message = id ? 'Registro actualizado correctamente' : 'Registro creado correctamente';
        try {
            const response = await method(`${'producto'}/${id || ''}`, data);
            NotificationManager.success(message);
            navigate(`${'/inventario/producto/edit'}/${response.IdProducto}`, { replace: true })

        }  catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const {
        listCategoria, codigo, descripcion, precio, categoria
    } = state;

    return (
        <>
            <Formik
                initialValues={{
                    codigo,
                    descripcion,
                    precio,
                    categoria,
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ touched, errors }) => (
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
                                                helperText={touched.codigo && errors.codigo ? errors.codigo : ""}
                                                error={touched.codigo && Boolean(errors.codigo)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="descripcion" as={TextField}
                                                fullWidth
                                                label="Descripcion"
                                                type="text"
                                                helperText={touched.descripcion && errors.descripcion ? errors.descripcion : ""}
                                                error={touched.descripcion && Boolean(errors.descripcion)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="precio" as={TextField}
                                                fullWidth
                                                label="Precio"
                                                type="number"
                                                helperText={touched.precio && errors.precio ? errors.precio : ""}
                                                error={touched.precio && Boolean(errors.precio)}
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



