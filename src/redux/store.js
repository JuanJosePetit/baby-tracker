// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import departamentosReducer from './slices/departamentosSlice'
import ciudadesReducer from './slices/ciudadesSlice'
import categoriasReducer from './slices/categoriasSlice';
import eventosReducer from './slices/eventosSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    departamentos: departamentosReducer,
    ciudades: ciudadesReducer,
    categorias: categoriasReducer,
    eventos:eventosReducer
  },
});
