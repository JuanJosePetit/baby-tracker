import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usuario: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsuario: (state, action) => {
            state.usuario = action.payload.usuario;
            state.token = action.payload.token;
            localStorage.setItem('usuario', JSON.stringify(state.usuario));
            localStorage.setItem('token', state.token);
        },
        cerrarSesion: (state) => {
            state.usuario = null;
            state.token = null;
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
        },
        cargarUsuarioDesdeStorage: (state) => {
            const usuario = localStorage.getItem('usuario');
            const token = localStorage.getItem('token');
            if (usuario && token) {
                state.usuario = JSON.parse(usuario);
                state.token = token;
            }
        }
    }
})

export const { setUsuario, cerrarSesion, cargarUsuarioDesdeStorage } = authSlice.actions;

export default authSlice.reducer;

