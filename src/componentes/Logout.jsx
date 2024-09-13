import React from 'react';
import { useDispatch } from 'react-redux';
import { cerrarSesion } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(cerrarSesion());
        navigate("/");
    };

    return (
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLogout}
            sx={{ mt: 2 }}
        >
            Cerrar Sesión
        </Button>
    );
};

export default Logout;

