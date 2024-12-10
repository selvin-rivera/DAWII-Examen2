import axios from 'axios'

export const getPromedioProducto_Categoria = async ()=>{

    const response = await axios.get('http://localhost:5000/promedio-categoria');
    return response.data

}

export const getCantidadProducto_Marca = async ()=>{

    const response = await axios.get('http://localhost:5000/cantidad-producto-marca');
    return response.data

}

export const getValorTotal_categoria = async ()=>{

    const response = await axios.get(`http://localhost:5000/suma-categoria`);
    return response.data

}
