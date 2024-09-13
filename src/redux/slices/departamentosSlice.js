import { createSlice } from "@reduxjs/toolkit";

const initialState = {
          departamentos: []
}

export const departamentosSlice = createSlice({
          name: "departamentos",
          initialState,
          reducers: {}
})

export const {  } = departamentosSlice.actions;
export default departamentosSlice.reducer;