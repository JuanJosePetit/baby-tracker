// src/paginas/Registro.js
import React from 'react';
import FormularioRegistro from '../componentes/FormularioRegistro';
import { Typography, Container, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const Registro = () => {
  return (
    <Container component="main" maxWidth="xs">
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
        <Typography variant="h2" component="h2" gutterBottom>
          Registro
        </Typography>
        <Typography variant="body1" component="p" align="center" sx={{ mb: 4 }}>
          Por favor, complete el siguiente formulario para registrarse.
        </Typography>
        <FormularioRegistro />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            ¿Ya tienes una cuenta?
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
          >
            Loguearse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Registro;

