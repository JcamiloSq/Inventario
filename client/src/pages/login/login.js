import React from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import useApi from '../../components/UseApi';


const validationSchema = Yup.object().shape({
  username: Yup.string().required('El usuario es requerido'),
  password: Yup.string().required('La constraseña es requerida'),
});

const initialState = {
  username: '',
  password: '',
}

function Login() {
  const { doGet } = useApi();
  const navigate = useNavigate();
  const OnSubmit = async(values)=> {
    try {
      await doGet('login', values);
      localStorage.setItem('user', JSON.stringify(values.username));
      navigate('/Dashboard');
    } catch (error){
      NotificationManager.warning(error.message);
    }
  }

  return (
      <Formik
        initialValues={initialState}
        onSubmit={OnSubmit}
        validationSchema={validationSchema}
      >
        {({errors, touched}) => (
          <FormikForm>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }} >
              <Grid item xs={10} sm={6} md={4} lg={4}>
                <Paper elevation={6} style={{ padding: '20px' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                  Ingreso sistema inventario
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field name="username" as={TextField}
                        fullWidth
                        label="Usuario"
                        type="text"
                        autoFocus
                        helperText={touched.username && errors.username ? errors.username : ""}
                        error={touched.username && Boolean(errors.username)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field name="password" as={TextField}
                        fullWidth
                        label="Contraseña"
                        type="password"
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <FontAwesomeIcon icon={faLock} />
                            </InputAdornment>
                          )
                        }}
                        helperText={touched.password && errors.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        type='submit'
                        variant="contained"
                        size="large"
                      >Acceder</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </FormikForm>
        )}
      </Formik>
  );
}

export default Login;



