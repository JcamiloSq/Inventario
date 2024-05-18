import React from 'react';
import { Field, Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Paper, IconButton } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import useApi from '../../components/UseApi';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const validationSchema = Yup.object().shape({
  username: Yup.string().required('El usuario es requerido'),
  password: Yup.string().required('La constraseña es requerida'),
});

const initialState = {
  username: '',
  password: '',
}

function Login() {
  const { doPost } = useApi();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const OnSubmit = async(values)=> {
    try {
      await doPost('login', values);
      localStorage.setItem('user', JSON.stringify(values.username));
      navigate('/dashboard');
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
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
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



