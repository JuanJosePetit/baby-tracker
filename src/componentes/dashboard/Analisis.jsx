import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorias } from "../../redux/slices/categoriasSlice";
import { fetchEventos } from '../../redux/slices/eventosSlice';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';

const Analisis = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchCategorias());
    dispatch(fetchEventos());
  }, [dispatch]);

  const categorias = useSelector(state => state.categorias.list);
  const eventos = useSelector(state => state.eventos.list);

  useEffect(() => {
    if (categorias.length > 0 && eventos.length > 0) {
      const categoryCount = categorias.map(categoria => {
        const count = eventos.filter(evento => evento && evento.idCategoria === categoria.id).length;
        return count > 0 ? { name: categoria.tipo, value: count } : null;
      }).filter(item => item !== null);

      setData(categoryCount);
    }
  }, [categorias, eventos]);


  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Gráfico de cantidades por categoría
        </Typography>
        <PieChart
          series={[
            {
              data: data.map((item) => ({
                id: item.id,
                value: item.value,
                label: item.name
              })),
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={200}
        />
      </CardContent>
    </Card>
  );
}

export default Analisis;