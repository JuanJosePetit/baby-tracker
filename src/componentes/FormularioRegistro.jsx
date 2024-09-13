import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsuario } from '../redux/slices/authSlice';
import Departamentos from './registro/Departamentos';
import Ciudades from './registro/Ciudades';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  NativeSelect,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

const URL = 'https://babytracker.develotion.com/';

const FormularioRegistro = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    idDepartamento: '',
    idCiudad: '',
  });

  const [errors, setErrors] = useState({
    usuario: '',
    password: '',
    idDepartamento: '',
    idCiudad: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      usuario: '',
      password: '',
      idDepartamento: '',
      idCiudad: '',
    };

    if (!formData.usuario) {
      newErrors.usuario = 'El nombre de usuario es obligatorio.';
    } else if (!/^[\w]{4,}$/.test(formData.usuario)) {
      newErrors.usuario = 'El nombre de usuario debe tener al menos 4 caracteres.';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula y un número.';
    }

    if (!formData.idDepartamento) {
      newErrors.idDepartamento = 'Debe seleccionar un departamento.';
    }

    if (!formData.idCiudad) {
      newErrors.idCiudad = 'Debe seleccionar una ciudad.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`${URL}usuarios.php`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 409) {
              throw new Error('El nombre de usuario ya existe');
            }
            throw new Error('Error en los datos');
          }
          return response.json();
        })
        .then(data => {
          dispatch(setUsuario({ usuario: data.id, token: data.apiKey }));
          navigate('/dashboard');
        })
        .catch(err => {
          setErrors(prevErrors => ({
            ...prevErrors,
            usuario: err.message,
          }));
        });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', px: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 2 }}>
        <CardHeader title="Registro" titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              label="Nombre de Usuario"
              required
              fullWidth
              error={!!errors.usuario}
              helperText={errors.usuario}
            />
            <TextField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Contraseña"
              required
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormControl fullWidth margin="normal" error={!!errors.idDepartamento}>
              <InputLabel id="departamento-label">Departamento</InputLabel>
              <NativeSelect
                id="idDepartamento"
                name="idDepartamento"
                value={formData.idDepartamento}
                onChange={handleChange}
                required
                inputProps={{ 'aria-label': 'Departamento' }}
              >
                <option value=""> </option>
                <Departamentos />
              </NativeSelect>
              {errors.idDepartamento && <Typography color="error" variant="body2">{errors.idDepartamento}</Typography>}
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.idCiudad}>
              <InputLabel id="ciudad-label">Ciudad</InputLabel>
              <NativeSelect
                id="idCiudad"
                name="idCiudad"
                value={formData.idCiudad}
                onChange={handleChange}
                required
                inputProps={{ 'aria-label': 'Ciudad' }}
              >
                <option value=""> </option>
                <Ciudades idDepartamento={formData.idDepartamento} />
              </NativeSelect>
              {errors.idCiudad && <Typography color="error" variant="body2">{errors.idCiudad}</Typography>}
            </FormControl>
            {errors.usuario && <Typography color="error" variant="body2">{errors.usuario}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormularioRegistro;


