import { createSlice } from '@reduxjs/toolkit';

const URL = "https://babytracker.develotion.com/";

const initialState = {
  list: [],
};

const eventosSlice = createSlice({
  name: 'eventos',
  initialState,
  reducers: {
    fetchEventosSuccess(state, action) {
      state.list = action.payload;
    },
    addEventoSuccess(state, action) {
      state.list.push(action.payload);
    },
    deleteEventoSuccess(state, action) {
      state.list = state.list.filter(evento => evento.id !== action.payload);
    },
  },
});

export const {
  fetchEventosSuccess, addEventoSuccess,deleteEventoSuccess} = eventosSlice.actions;

export const fetchEventos = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { token, usuario } = state.auth;
    if (!token || !usuario) {
      throw new Error('Token o usuario no están disponibles');
    }

    const response = await fetch(`${URL}eventos.php?idUsuario=${usuario}`, {
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
    dispatch(fetchEventosSuccess(data.eventos));
  } catch (error) {
    
  }
};

export const addEvento = (evento) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { token, usuario } = state.auth;

    const response = await fetch(`${URL}eventos.php`, {
      method: 'POST',
      body: JSON.stringify(evento),
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

    if (data.codigo === 200) {
      dispatch(fetchEventos());
      dispatch(addEventoSuccess(data.evento));
    } else {
      throw new Error('Error al agregar evento');
    }
  } catch (error) {
    
  }
};

export const deleteEvento = (idEvento) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { token, usuario } = state.auth;

    const response = await fetch(`${URL}eventos.php?idEvento=${idEvento}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'apikey': token,
        'iduser': usuario,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el evento');
    }

    const data = await response.json();
    if (data.codigo === 200) {
      dispatch(deleteEventoSuccess(idEvento));
    } else {
      throw new Error('Error al eliminar evento');
    }
  } catch (error) {
    
  }
};

export default eventosSlice.reducer;
