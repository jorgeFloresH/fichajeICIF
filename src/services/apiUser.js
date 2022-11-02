import axios from 'axios';
import { url } from './http'


export const loginVer = async (nombre, pass) => {
    return axios.get(`${url}Users/${nombre}/${pass}`).then((response) => {
        return response.data.usuarios[0]
      }).catch(error => {
        return error.response.status
      });
}

export  const urlCountUser = async (idAgencia) => {
  return axios.get(`${url}Users/UserFilterCount/${idAgencia}`).then((response) => {
      return response.data;
  }).catch(error => {
    console.log(error)
  });
}
