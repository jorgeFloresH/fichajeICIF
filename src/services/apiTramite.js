import axios from 'axios';
import { url } from './http'

//------------/api/Tramite/FilterAgencia/{agencia}----------------------GET
export const getTramiteAgen = async (idAgencia) => {
  return axios.get(`${url}Tramite/FilterAgencia/${idAgencia}`).then((res) => {
    return res.data;
  }).catch(error => {
    return error.response.data
  });
}

//Get tramite listar
export const peticionGet=()=>{
  return axios.get(`${url}Tramite/`).then((response) => {
      return response.data;
      }).catch(error => {
          return error.response.status;
      });
}

//Get tramite listar por agencia
export const peticionGetIdAge=(idAgencia)=>{
  return axios.get(`${url}Tramite/${idAgencia}`).then((response) => {
      return response.data;
      }).catch(error => {
          return error.response.status;
      });
}

//Post tramite
export const peticionPost = async (idTramite) => {
  return axios.post(`${url}Tramite/`, idTramite).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error.message);
  })
}

//Put tramite
export const peticionPut=(idTramite)=>{
  return axios.put(`${url}Tramite/`, idTramite).then((response) => {
      return response.data;
      }).catch(error => {
          return error.response.status;
      });
}

//Delete tramite
export const peticionDelete=(idTramite)=>{
  return axios.delete(`${url}Tramite/${idTramite}`).then((response) => {
      return response.data;;
      }).catch(error => {
          return error.response.status;
      });
}
