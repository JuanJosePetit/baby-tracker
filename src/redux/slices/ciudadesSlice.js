import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ciudades: []
}

export const ciudadesSlice = createSlice({
          name: "ciudades",
          initialState,
          reducers: {}
})

export const {  } = ciudadesSlice.actions;
export default ciudadesSlice.reducer;