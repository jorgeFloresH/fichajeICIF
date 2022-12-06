import axios from 'axios';
import { url } from './http'

//------------/api/Tramite/FilterAgencia/{agencia}----------------------GET
export const getTramiteAgen = async (idA) => {
  return axios.get(`${url}Tramite/FilterAgencia/${idA}`).then((res) => {
    return res.data;
  }).catch(error => {
    return error.response.data
  });
}