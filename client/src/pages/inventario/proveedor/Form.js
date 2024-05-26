import React, { useState, useEffect } from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, Toolbar } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import useApi from '../../../components/UseApi';
import { useNavigate, useParams } from 'react-router-dom';


const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    nit: Yup.string().required('El nit es requerido'),
    telefono: Yup.string().required('El telefono es requerido'),
    email: Yup.string().required('El email es requerido').email('Debe ser un correo electronico valido'),

});

const initialState = {
      nombre: '',
      nit: '',
      telefono: '',
      email: '',
 }

export default function FormProveedor() {

    const {id = null} = useParams();

    const { doPost, doGet, doPut } = useApi();
    const [state, setPrevState] = useState(initialState);
    const navigate = useNavigate();

    const setState = (dataState) => {
        setPrevState((prevState) => ({ ...prevState, ...dataState }));
      };

    useEffect(()=>{

        const init = async()=>{
            if (id) {
                const data = await doGet(`${'proveedor'}/${id}`);
                const {Nombre, Nit, Telefono, Email} = data;
                setState({
                    nombre: Nombre,
                    nit: Nit,
                    telefono: Telefono,
                    email: Email,
                })
            }
        };

        init();

    }, [doGet, id]);


    const onSubmit = async (values) => {
        console.log(values);
        const data = {
            Nombre: values.nombre,
            Nit: values.nit,
            Telefono: values.telefono,
            Email: values.email,
        }

        const method = id ? doPut : doPost;

        const message = id ? 'Registro actualizado correctamente' : 'Registro creado correctamente';
        try {
            const response = await method(`${'proveedor'}/${id || ''}`, data);
            NotificationManager.success(message);
            navigate(`${'/inventario/proveedor/edit'}/${response.IdProveedor}`, { replace: true })

        }  catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const {
        nombre,
        nit,
        telefono,
        email,
    } = state;
    return (
        <>
            <Formik
                initialValues={{
                   nombre,
                   nit,
                   telefono,
                   email,
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
                                    Rol
                                    </Typography>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >Guardar</Button>
                                    </Grid>
                                    <Toolbar />
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item xs={2}>
                                            <Field name="nombre" as={TextField}
                                                fullWidth
                                                label="Nombre del Proveedor"
                                                type="text"
                                                helperText={touched.nombre && errors.nombre ? errors.nombre : ""}
                                                error={touched.nombre && Boolean(errors.nombre)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="nit" as={TextField}
                                                fullWidth
                                                label="Nit"
                                                type="text"
                                                helperText={touched.nit && errors.nit ? errors.nit : ""}
                                                error={touched.nit && Boolean(errors.nit)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="telefono" as={TextField}
                                                fullWidth
                                                label="Telefono"
                                                type="text"
                                                helperText={touched.telefono && errors.telefono ? errors.telefono : ""}
                                                error={touched.telefono && Boolean(errors.telefono)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="email" as={TextField}
                                                fullWidth
                                                label="Email"
                                                type="email"
                                                helperText={touched.email && errors.email ? errors.email : ""}
                                                error={touched.email && Boolean(errors.email)}
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



