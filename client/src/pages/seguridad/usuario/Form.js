import React, { useState, useEffect } from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, Toolbar } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import useApi from '../../../components/UseApi';
import { useNavigate, useParams } from 'react-router-dom';
import SelectComponent from '../../../components/Select';


const validationSchema = Yup.object().shape({
    nombrerol: Yup.string().required('El rol es requerido'),
    usuario: Yup.string().required('El usuario es requerido'),
    contrasena: Yup.string().required('La contaseña es requerida')
        .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])/,
        'La contraseña debe contener al menos un carácter alfabético, un número y un carácter especial'
      ).min(9, 'La contraseña debe contener minimo 8 caracteres'),
    email: Yup.string().email('Debe ser un correo electronico valido').required('El correo es requerido'),
    nombrecompleto: Yup.string().required('El Nombre completo es requerido'),
});

const initialState = {
    usuario: '',
    nombrecompleto: '',
    nombrerol: '',
    contrasena: '',
    email: '',
    listRoles: [],
 }

export default function FormUser() {

    const {id = null} = useParams();

    const { doPost, doGet, doPut } = useApi();
    const [state, setPrevState] = useState(initialState);
    const navigate = useNavigate();

    const setState = (dataState) => {
        setPrevState((prevState) => ({ ...prevState, ...dataState }));
      };

    useEffect(()=>{

        const init = async()=>{
            const response = await doGet('usuario/roles');
            setState({ listRoles: response })
            if (id) {
                const data = await doGet(`${'usuario'}/${id}`);
                const { IdRol, Usuario, NombreCompleto, Contrasena, Email } = data;
                setState({
                    nombrerol: IdRol,
                    usuario: Usuario,
                    nombrecompleto: NombreCompleto,
                    contrasena: Contrasena,
                    email: Email,
                    listRoles: response,
                })
            }
        };

        init();

    }, [doGet, id]);


    const onSubmit = async (values) => {
        const data = {
            Usuario: values.usuario,
            NombreCompleto: values.nombrecompleto,
            Contrasena: values.contrasena,
            IdRol: values.nombrerol,
            Email: values.email,
        }

        const method = id ? doPut : doPost;

        const message = id ? 'Registro actualizado correctamente' : 'Registro creado correctamente';
        try {
            const response = await method(`${'usuario'}/${id || ''}`, data);
            NotificationManager.success(message);
            navigate(`${'/seguridad/usuario/edit'}/${response.IdRol}`, { replace: true })

        }  catch (error) {
            NotificationManager.warning(error.message);
        }
    }

    const {
        nombrerol, usuario, nombrecompleto, contrasena, email, listRoles
    } = state;
    return (
        <>
            <Formik
                initialValues={{
                   nombrerol,
                   usuario,
                   nombrecompleto,
                   contrasena,
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
                                            type='submit'
                                            variant="contained"
                                        >Guardar</Button>
                                    </Grid>
                                    <Toolbar />
                                    <Grid container spacing={2} alignItems="flex-end">
                                        <Grid item xs={2}>
                                            <Field name="usuario" as={TextField}
                                                fullWidth
                                                label="Usuario"
                                                type="text"
                                                helperText={touched.usuario && errors.usuario ? errors.usuario : ""}
                                                error={touched.usuario && Boolean(errors.usuario)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="nombrecompleto" as={TextField}
                                                fullWidth
                                                label="Nombre completo"
                                                type="text"
                                                helperText={touched.nombrecompleto && errors.nombrecompleto ? errors.nombrecompleto : ""}
                                                error={touched.nombrecompleto && Boolean(errors.nombrecompleto)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="contrasena" as={TextField}
                                                fullWidth
                                                label="Contraseña"
                                                type="password"
                                                inputProps={{ maxLength: 10 }}
                                                helperText={touched.contrasena && errors.contrasena ? errors.contrasena : ""}
                                                error={touched.contrasena && Boolean(errors.contrasena)}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Field name="email" as={TextField}
                                                fullWidth
                                                label="Correo"
                                                type="email"
                                                helperText={touched.email && errors.email ? errors.email : ""}
                                                error={touched.email && Boolean(errors.email)}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Field
                                                label="Rol"
                                                name="nombrerol"
                                                component={SelectComponent}
                                                items={listRoles}
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



