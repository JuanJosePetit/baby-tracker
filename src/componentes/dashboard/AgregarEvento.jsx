import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, NativeSelect, Box, Typography, Card, CardContent } from '@mui/material';

import Categorias from './dashboardComps/Categorias';
import { addEvento, fetchEventos } from '../../redux/slices/eventosSlice';

const AgregarEvento = () => {
  const [formData, setFormData] = useState({
    idCategoria: '',
    fecha: '',
    detalles: '',
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { usuario, token } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar la fecha
    const currentDate = new Date();
    const inputDate = new Date(formData.fecha);
    if (inputDate > currentDate) {
      setError('La fecha no puede ser mayor a la fecha actual.');
      return;
    }

    const dataToSend = {
      idCategoria: formData.idCategoria,
      idUsuario: usuario,
      detalle: formData.detalles,
      fecha: formData.fecha,
    };

    dispatch(addEvento(dataToSend));
    dispatch(fetchEventos());
    setError(null);  
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        mb: 2, 
      }}
    >
      <Card sx={{ p: 2, minHeight: 415}}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Agregar Evento
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoria-label">Categoría</InputLabel>
            <NativeSelect
              label="categoria-label"
              name="idCategoria"
              value={formData.idCategoria}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <Categorias />
            </NativeSelect>
          </FormControl>
          <TextField
            type="datetime-local"
            name="fecha"
            label="Fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            type="text"
            name="detalles"
            label="Detalles"
            value={formData.detalles}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Agregar
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AgregarEvento;
