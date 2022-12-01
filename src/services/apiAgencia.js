import axios from 'axios';
import { url } from './http'

//------------/api/Agency----------------------GET
export const getAgenciaAll = async () => {
    return axios.get(`${url}Agency`).then((response) => {
        return response.data;
    }).catch(error => {
      console.log(error)
    });
}

//------------/api/Agency----------------------POST
export const postAgencia = async (datos) => {
  return axios.post(`${url}Agency`, datos).then((response) => {
      return response.data;
  }).catch(error => {
    console.log(error)
  });
}

//------------/api/Agency----------------------PUT
export const editAgencia = async (estadoA, agenciaId, form, tipo) => {
  let aput
  if (tipo == 0){
    aput = { estado: estadoA, idAgencia: agenciaId}
  }
  else{
    aput = form
  }
  return axios.put(`${url}Agency`, aput).then((response) => {
    return response.data;
  }).catch(error => {
    console.log(error)
  });
}