import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventos } from '../../../redux/slices/eventosSlice';
import { fetchCategorias } from '../../../redux/slices/categoriasSlice';
import { Box, Typography } from '@mui/material';


const InformeBiberones = () => {
  const [totalBiberonesHoy, setTotalBiberonesHoy] = useState(0);
  const [tiempoDesdeUltimoBiberon, setTiempoDesdeUltimoBiberon] = useState(null);
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

      const biberonesCategoria = categorias.find(cat => cat.tipo && cat.tipo.toLowerCase() === 'biberón');

      if (biberonesCategoria) {
        const eventosBiberon = eventos.filter(evento => 
          evento && 
          evento.idCategoria === biberonesCategoria.id &&
          evento.fecha && 
          evento.fecha.startsWith(hoy)
        );

        setTotalBiberonesHoy(eventosBiberon.length);

        if (eventosBiberon.length > 0) {
          const ultimoBiberon = eventosBiberon.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
          const tiempoActual = new Date();
          const tiempoUltimoBiberon = new Date(ultimoBiberon.fecha);
          const diferenciaTiempo = Math.floor((tiempoActual - tiempoUltimoBiberon) / 1000 / 60);

          setTiempoDesdeUltimoBiberon(diferenciaTiempo);
        }
      }
    }
  }, [categorias, eventos]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Total de Biberones Hoy
      </Typography>
      <Typography variant="h6" component="div">
        {totalBiberonesHoy}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {tiempoDesdeUltimoBiberon !== null ? (
          `Tiempo desde el último biberón: ${tiempoDesdeUltimoBiberon} minutos`
        ) : (
          'No se ha registrado ningún biberón hoy.'
        )}
      </Typography>
    </Box>
  );
  
}

export default InformeBiberones;
