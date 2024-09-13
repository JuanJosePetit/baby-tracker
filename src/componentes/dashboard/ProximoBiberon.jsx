import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventos } from '../../redux/slices/eventosSlice';
import { fetchCategorias } from '../../redux/slices/categoriasSlice';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ProximoBiberon = () => {
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const { list: eventos } = useSelector(state => state.eventos);
  const { list: categorias } = useSelector(state => state.categorias);
  const { token, usuario } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && usuario) {
      dispatch(fetchEventos());
      dispatch(fetchCategorias());
    }
  }, [token, usuario, dispatch]);

  useEffect(() => {
    if (categorias.length > 0 && eventos.length > 0) {
      const biberonesCategoria = categorias.find(cat => cat.tipo && cat.tipo.toLowerCase() === 'biberón');

      if (biberonesCategoria) {
        const eventosBiberon = eventos
          .filter(evento => 
            evento && 
            evento.idCategoria === biberonesCategoria.id &&
            evento.fecha
          )
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        if (eventosBiberon.length > 0) {
          const ultimoBiberon = new Date(eventosBiberon[0].fecha);
          const proximoBiberon = new Date(ultimoBiberon.getTime() + 4 * 60 * 60 * 1000); // Agregar 4 horas
          const ahora = new Date();
          const diferenciaTiempo = Math.floor((proximoBiberon - ahora) / (1000 * 60)); // Diferencia en minutos

          setTiempoRestante(diferenciaTiempo);
        }
      }
    }
  }, [categorias, eventos]);

  return (
    <Card sx={{ minHeight: 280,maxWidth: 600, mx: 'auto', mb: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Tiempo Restante para el Próximo Biberón
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: tiempoRestante > 0 ? 'green' : 'red' }}>
          {tiempoRestante !== null ? (
            tiempoRestante > 0 ? 
            `Quedan ${tiempoRestante} minutos para el próximo biberón.` :
            `Se excedió el tiempo por ${Math.abs(tiempoRestante)} minutos.`
          ) : (
            'No se ha registrado ningún biberón recientemente.'
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProximoBiberon;



