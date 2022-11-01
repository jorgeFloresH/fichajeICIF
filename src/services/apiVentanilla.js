import axios from 'axios';
import { url } from './http'


export const getVentanillaId = async (idA) => {    
    return axios.get(`${url}Ventanilla/filterByAgEs/${idA}`).then((res) => {
        return(res.data.response)
      }).catch(error => {
        return(error.response.data)
      });
}

export const estadoVentanilla = async (idVentanilla, estado) => {
    const status = {estadoV:estado, idVentanilla:idVentanilla}
    return axios.put(`${url}Ventanilla`, status).then((res) => {
    }).catch(error => {
      console.log(error)
    });
  

}