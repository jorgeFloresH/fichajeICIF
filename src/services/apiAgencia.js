import axios from 'axios';
import { url } from './http'


export const getAgenciaAll = async () => {
    return axios.get(`${url}Agency`).then((response) => {
        return response.data;
    }).catch(error => {
      console.log(error)
    });
}

export const editAgencia = async (estadoA, agenciaId) => {
    const aput = { estado: estadoA, idAgencia: agenciaId}
    return axios.put(`${url}Agency`, aput).then((response) => {
        return response.data;
    }).catch(error => {
      console.log(error)
    });
}