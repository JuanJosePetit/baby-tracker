import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchCategorias } from "../../redux/slices/categoriasSlice";
import { fetchEventos } from '../../redux/slices/eventosSlice';
import { Card, CardContent, Typography } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Analisis2 = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: 'Comidas Ingeridas',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }]
    });

    const categorias = useSelector(state => state.categorias.list);
    const eventos = useSelector(state => state.eventos.list);

    useEffect(() => {
        dispatch(fetchCategorias());
        dispatch(fetchEventos());
    }, [dispatch]);

    useEffect(() => {
        if (categorias.length > 0 && eventos.length > 0) {
            const today = new Date();
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                return date.toISOString().split('T')[0];
            }).reverse();

            const categoryCount = last7Days.map(day => {
                const count = eventos.filter(evento => 
                    evento && evento.fecha.startsWith(day) && 
                    categorias.some(cat => cat.id === evento.idCategoria && cat.tipo === "Comida")
                ).length;
                return count;
            });

            setData({
                labels: last7Days,
                datasets: [{
                    label: 'Comidas Ingeridas',
                    data: categoryCount,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                }]
            });
        }
    }, [categorias, eventos]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cantidad de Comidas Ingeridas en la Última Semana',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad de Comidas',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Días',
                },
            },
        },
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Gráfico de Comidas Ingeridas en la Última Semana
                </Typography>
                <Bar options={options} data={data} />
            </CardContent>
        </Card>
    );
}

export default Analisis2;
