
import axios from 'axios'
import { url } from './http';

//------------/api/countUserWTicket/{idAgencia}----------------------GET
 export  const contDasthboard = async (idAgencia) => {
    return axios.get(`${url}countUserWTicket/${idAgencia}`).then((response) => {
        return response.data;
    }).catch(error => {
      console.log(error)
    });
  }
  