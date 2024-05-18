import React, { useState, useEffect } from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, Toolbar } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import useApi from '../../../components/UseApi';
import { useNavigate, useParams } from 'react-router-dom';


const validationSchema = Yup.object().shape({
    nombrerol: Yup.string().required('El nombre es requerido'),

});

const initialState = {
      nombrerol: ''
 }

export default function FormRol() {

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
                const data = await doGet(`${'rol'}/${id}`);
                const {NombreRol} = data;
                setState({
                    nombrerol: NombreRol
                })
            }
        };

        init();

    }, [doGet, id]);


    const onSubmit = async (values) => {
        const data = {
            NombreRol: values.nombrerol
        }

        const method = id ? doPut : doPost;

        const message = id ? 'Registro actualizado correctamente' : 'Registro creado correctamente';
        try {
            const response = await method(`${'rol'}/${id || ''}`, data);
            NotificationManager.success(message);
            navigate(`${'/seguridad/rol/edit'}/${response.IdRol}`, { replace: true })

        }  catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const {
        nombrerol
    } = state;
    return (
        <>
            <Formik
                initialValues={{
                   nombrerol
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
                                            type='submit'
                                            variant="contained"
                                        >Guardar</Button>
                                    </Grid>
                                    <Toolbar />
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item xs={2}>
                                            <Field name="nombrerol" as={TextField}
                                                fullWidth
                                                label="Nombre del Rol"
                                                type="text"
                                                helperText={touched.nombrerol && errors.nombrerol ? errors.nombrerol : ""}
                                                error={touched.nombrerol && Boolean(errors.nombrerol)}
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



