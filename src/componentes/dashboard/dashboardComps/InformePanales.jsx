import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventos } from '../../../redux/slices/eventosSlice';
import { fetchCategorias } from '../../../redux/slices/categoriasSlice';
import { Box, Typography } from '@mui/material';

const InformePañales = () => {
  const [totalPañalesHoy, setTotalPañalesHoy] = useState(0);
  const [tiempoDesdeUltimoPañal, setTiempoDesdeUltimoPañal] = useState(null);
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
      const hoy = new Date().toISOString().split('T')[0];

      const pañalesCategoria = categorias.find(cat => cat.tipo && cat.tipo.toLowerCase() === 'pañal');

      if (pañalesCategoria) {
        const eventosPañal = eventos.filter(evento => 
          evento && 
          evento.idCategoria === pañalesCategoria.id &&
          evento.fecha && 
          evento.fecha.split(' ')[0] === hoy
        );

        setTotalPañalesHoy(eventosPañal.length);

        if (eventosPañal.length > 0) {
          const ultimoPañal = eventosPañal.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
          const tiempoActual = new Date();
          const tiempoUltimoPañal = new Date(ultimoPañal.fecha);
          const diferenciaTiempo = Math.floor((tiempoActual - tiempoUltimoPañal) / 1000 / 60);

          setTiempoDesdeUltimoPañal(diferenciaTiempo);
        }
      }
    }
  }, [categorias, eventos]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Total de Pañales Cambiados Hoy
      </Typography>
      <Typography variant="h6" component="div">
        {totalPañalesHoy}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {tiempoDesdeUltimoPañal !== null ? (
          `Tiempo desde el último cambio de pañal: ${tiempoDesdeUltimoPañal} minutos`
        ) : (
          'No se ha registrado ningún cambio de pañal hoy.'
        )}
      </Typography>
    </Box>
  );
}

export default InformePañales;

