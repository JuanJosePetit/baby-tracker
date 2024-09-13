import React from 'react';
import { Container, Box, Typography, Divider, Grid, Avatar } from '@mui/material';
import Logout from '../componentes/Logout';
import AgregarEvento from '../componentes/dashboard/AgregarEvento';
import Analisis from '../componentes/dashboard/Analisis';
import Analisis2 from '../componentes/dashboard/Analisis2';
import InformeEventos from '../componentes/dashboard/InformeEventos';
import ListadoEventos from '../componentes/dashboard/ListadoEventos';
import ProximoBiberon from '../componentes/dashboard/ProximoBiberon';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
        <Typography variant="h3" component="h1">
          Baby Care
        </Typography>
        <Logout />
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <AgregarEvento />
            </Grid>
            <Grid item xs={12} md={6}>
              <InformeEventos />
            </Grid>
            <Grid item xs={6}>
              <Analisis />
            </Grid>
            <Grid item xs={6}>
              <ProximoBiberon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <ListadoEventos />
        </Grid>
        <Grid item xs={12} maxHeight={300}> 
          <Analisis2 />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;


