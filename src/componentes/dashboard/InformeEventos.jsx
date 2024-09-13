import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import InformeBiberones from './dashboardComps/InformeBiberones';
import InformePanales from './dashboardComps/InformePanales';

const InformeEventos = () => {
  return (
<Box
  sx={{
    width: '100%',
    maxWidth: 600,
    mx: 'auto',
    mb: 2, 
  }}
>
  <Card sx={{p: 1 }}>
    <CardContent>
      <Typography variant="h5" component="h1" gutterBottom>
        Informe de Eventos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InformeBiberones />
        </Grid>
        <Grid item xs={12} md={6}>
          <InformePanales />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
</Box>

  );
};

export default InformeEventos;
