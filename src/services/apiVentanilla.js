import axios from 'axios';
import { url } from './http'

//------------/api/Ventanilla/filterByAgEs/{agencia}----------------------GET
export const getVentanillaId = async (idA) => {
  return axios.get(`${url}Ventanilla/filterByAgEs/${idA}`).then((res) => {
    return res.data;
  }).catch(error => {
    return error.response.data
  });
}

//------------/api/Ventanilla----------------------PUT
export const estadoVentanilla = async (idVentanilla, estado) => {
  const status = { estadoV: estado, idVentanilla: idVentanilla }
  return axios.put(`${url}Ventanilla`, status).then((res) => {
  }).catch(error => {
    console.log(error)
  });
}
//------------/api/Ventanilla/WindowsFilter/${agencia}----------------------GET

export const peticionGetIdAge = (agencia) => {
  return axios.get(`${url}Ventanilla/WindowsFilter/${agencia}`).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error.message);
  })
}

//------------/api/Ventanilla/----------------------GET
export const peticionGetVentanillaSuperAdmin = () => {
  return axios.get(`${url}Ventanilla/`).then(response => {
    return response.data.response;
  }).catch(error => {
    console.log(error.message);
  })
}

/**----Post Ventanilla------*/
export const peticionPostVen = async (data) => {
  return axios.post(`${url}Ventanilla`, data).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
  })
}
/**----Put Ventanilla------*/
export const peticionPutVen = async(idVentanilla) =>{
  return axios.put(`${url}Ventanilla/`, idVentanilla).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error.message);
  })
}

/**----Delete Ventanilla------*/
export const peticionDeleteVen = async(idVentanilla) =>{
return axios.delete(`${url}Ventanilla/${idVentanilla}`).then(response => {
  return response.data;
}).catch(error => {
  console.log(error.message);
})
}