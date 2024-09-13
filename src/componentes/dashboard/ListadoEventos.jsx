import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { fetchCategorias } from "../../redux/slices/categoriasSlice";
import { fetchEventos, deleteEvento } from '../../redux/slices/eventosSlice';

const ListadoEventos = () => {
  const { token, usuario } = useSelector((state) => state.auth);
  const { list: categorias } = useSelector(state => state.categorias);
  const { list: eventos } = useSelector(state => state.eventos);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && usuario) {
      dispatch(fetchEventos());
      dispatch(fetchCategorias());
    }
  }, [token, usuario, dispatch]);

  const handleDelete = (idEvento) => {
    dispatch(deleteEvento(idEvento));
  };

  const hoy = new Date().toISOString().split('T')[0];
  const eventosHoy = Array.isArray(eventos)
    ? eventos.filter(evento => evento && evento.fecha && evento.fecha.startsWith(hoy))
    : [];
  const eventosAnteriores = Array.isArray(eventos)
    ? eventos.filter(evento => evento && evento.fecha && !evento.fecha.startsWith(hoy))
    : [];

  const getCategoriaImageUrl = (idCategoria) => {
    const categoria = categorias.find(cat => cat.id === idCategoria);
    return categoria ? `https://babytracker.develotion.com/imgs/${categoria.imagen}.png` : '';
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        mb: 2,
      }}
    >
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Eventos del Día
          </Typography>
          <Box
            sx={{
              maxHeight: 300, 
              minHeight:  300,
              overflowY: 'auto', 
              mb: 2,
            }}
          >
            <List>
              {eventosHoy.length > 0 ? (
                eventosHoy.map((evento) => (
                  <Card key={evento.id} sx={{ mb: 2 }}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={getCategoriaImageUrl(evento.idCategoria)} alt="Categoría" />
                      </ListItemAvatar>
                      <ListItemText primary={evento.detalle} secondary={evento.fecha} />
                      <Button variant="contained" color="warning" onClick={() => handleDelete(evento.id)}>
                        Eliminar
                      </Button>
                    </ListItem>
                  </Card>
                ))
              ) : (
                <Typography variant="body2">No hay eventos registrados para hoy.</Typography>
              )}
            </List>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Eventos de Días Anteriores
          </Typography>
          <Box
            sx={{
              maxHeight: 300, 
              minHeight:  300,
              overflowY: 'auto', 
            }}
          >
            <List>
              {eventosAnteriores.length > 0 ? (
                eventosAnteriores.map((evento) => (
                  <Card key={evento.id} sx={{ mb: 2 }}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={getCategoriaImageUrl(evento.idCategoria)} alt="Categoría" />
                      </ListItemAvatar>
                      <ListItemText primary={evento.detalle} secondary={evento.fecha} />
                      <Button variant="contained" color="warning" onClick={() => handleDelete(evento.id)}>
                        Eliminar
                      </Button>
                    </ListItem>
                  </Card>
                ))
              ) : (
                <Typography variant="body2">No hay eventos registrados en días anteriores.</Typography>
              )}
            </List>
          </Box>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListadoEventos;