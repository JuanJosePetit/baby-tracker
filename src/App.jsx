import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cargarUsuarioDesdeStorage } from './redux/slices/authSlice';
import Registro from './paginas/Registro';
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cargarUsuarioDesdeStorage());
  }, [dispatch]);

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;




