import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsuario } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Card, CardContent, CardHeader } from "@mui/material";

const FormularioLogin = () => {
    const [formData, setFormData] = useState({ usuario: '', password: '' });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const URL = "https://babytracker.develotion.com/";
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${URL}login.php`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Datos incorrectos');
                }
                return response.json();
            })
            .then((data) => {
                dispatch(setUsuario({ usuario: data.id, token: data.apiKey }));
                navigate('/dashboard');
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh', px: 2 }}>
            <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 2 }}>
                <CardHeader title="Iniciar Sesión" titleTypographyProps={{ variant: 'h6' }} />
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
                        />
                        <TextField
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            label="Contraseña"
                            required
                            fullWidth
                        />
                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!formData.usuario || !formData.password}
                        >
                            Ingresar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FormularioLogin;

