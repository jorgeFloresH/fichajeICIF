import axios from 'axios';
import { url } from './http'


export const getAgenciaId = async (idA) => {    
    return axios.get(`${url}Agency/${idA}`).then((res) => {
        return(res.data.response)
      }).catch(error => {
        return(error.response.data)
      });
}
