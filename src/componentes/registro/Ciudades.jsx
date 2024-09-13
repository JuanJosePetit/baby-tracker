import React from 'react'
import { useState, useEffect } from 'react';


const URL = "https://babytracker.develotion.com/";

const Ciudades = ({idDepartamento}) => {
    const [ciudades, setCiudades] = useState([]);

    

    useEffect(() => {
      if (idDepartamento) {
        fetch(`${URL}ciudades.php?idDepartamento=${idDepartamento}`)
            .then(response => response.json())
            .then(data => {
                if (data.codigo === 200) {
                    setCiudades(data.ciudades);
                } else {
                    console.error('Error al obtener ciudades:', data);
                    setCiudades([]);
                }
            })
            .catch(err => {
                console.error('Error en la solicitud:', err);
                setCiudades([]);
            });
    } else {
        setCiudades([]);
    }
}, [idDepartamento]);


  return (
        <>
        {ciudades.map(ciudad => <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>)}
        </>
  )
}

export default Ciudades