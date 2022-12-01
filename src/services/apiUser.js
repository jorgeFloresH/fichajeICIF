import axios from 'axios';
import { url } from './http'


//------------/api/Users/{username}/{password}----------------------
export const loginVer = async (nombre, pass) => {
    return axios.get(`${url}Users/${nombre}/${pass}`).then((response) => {
        return response.data.usuarios[0]
      }).catch(error => {
        return error.response.status
      });
}

//------------/api/Users/UserFilterCount/{agencia}----------------------
export  const urlCountUser = async (idAgencia) => {
  return axios.get(`${url}Users/UserFilterCount/${idAgencia}`).then((response) => {
      return response.data;
  }).catch(error => {
    console.log(error)
  });
}

//------------/api/Users----------------------GET
export  const getAll = async () => {
  return axios.get(`${url}Users`).then((response) => {
    return response.data;
  }).catch(error => {
    console.log(error)
  });
}

//------------/api/Users----------------------PUT
export const editUser = async (estadoU, userId, form, control) => {
  let uput
  if (control == 0){
    uput = { estado: estadoU, idUsuario: userId}
  }
  else{
    uput = form
  }
  return axios.put(`${url}Users`, uput).then((response) => {
    return response.data;
  }).catch(error => {
    console.log(error)
  });
}

//------------/api/Users/UserFilter/{agencia}----------------------GET
export  const getFiltroAgencia = async (idAgencia) => {
  return axios.get(`${url}Users/UserFilter/${idAgencia}`).then((response) => {
    return response.data;
  }).catch(error => {
    console.log(error)
  });
}

