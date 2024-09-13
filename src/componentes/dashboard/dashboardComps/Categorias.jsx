import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategorias } from "../../../redux/slices/categoriasSlice";

const Categorias = () => {
    const dispatch = useDispatch();
    const { list: categorias } = useSelector(state => state.categorias);

    useEffect(() => {
            dispatch(fetchCategorias());
    }, [dispatch]);
    return (
        <>

            {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                    {categoria.tipo}
                </option>
            ))}
        </>
    );
};

export default Categorias;




