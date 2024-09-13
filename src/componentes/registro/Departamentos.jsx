import React from 'react'
import { useState, useEffect } from 'react';

const URL = "https://babytracker.develotion.com/";

const Departamentos = () => {
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        fetch(`${URL}departamentos.php`)
        .then(response => response.json())
        .then(data => {
          if (data.codigo === 200) {
            setDepartamentos(data.departamentos);
          } else {
            console.error('Error al obtener departamentos:', data);
          }
        })
        .catch(err => console.error('Error en la solicitud:', err));
    }, []);


  return (
        <>
        {departamentos.map(departamento => <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>)}
        </>
  )
}

export default Departamentos