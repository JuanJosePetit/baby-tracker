import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import FormularioLogin from '../componentes/FormularioLogin';
import { Container, Typography, Box, Button } from '@mui/material';

const Login = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Por favor, ingresa tus datos para acceder a tu cuenta.
        </Typography>
        <FormularioLogin />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            ¿No tienes una cuenta?
          </Typography>
          <Button
            component={RouterLink}
            to="/registro"
            variant="contained"
            color="primary"
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;



