import { createSlice } from '@reduxjs/toolkit';

const URL = "https://babytracker.develotion.com/";

const initialState = {
    list: [],

};

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState,
    reducers: {
        fetchCategoriasSuccess(state, action) {
            state.list = action.payload;
        }
    },
});

export const { fetchCategoriasSuccess } = categoriasSlice.actions;

export const fetchCategorias = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const { token, usuario } = state.auth;
        if (!token || !usuario) {
            throw new Error('Token o usuario no están disponibles');
        }

        const response = await fetch(`${URL}categorias.php`, {
            headers: {
                'Content-Type': 'application/json',
                'apikey': token,
                'iduser': usuario,
            },
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        dispatch(fetchCategoriasSuccess(data.categorias));
    } catch (error) {
        
    }
};

export default categoriasSlice.reducer;
