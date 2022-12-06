import axios from "axios";
import { url } from "./http";

//------------/api/UtTramite/Filter_UtTramite/{idUsuario}----------------------GET
export const tramiteUser = (idUsuario) => {
    return axios.get(`${url}UtTramite/Filter_UtTramite/${idUsuario}`).then(response=>{
        return response.data;
    }).catch(error=>{
        console.log(error.message);
    })
}
//------------/api/UtTramite----------------------POST
export  const addTramiteUSer = async (datos) => {
    return axios.post(`${url}UtTramite`,datos).then((response) => {
      return response.data;
    }).catch(error => {
      console.log(error)
    });
  }
//------------/api/UtTramite{id}----------------------POST
export  const deleteTramiteUSer = async (idUser) => {
  return axios.delete(`${url}UtTramite/${idUser}`).then((response) => {
    return response.data;
  }).catch(error => {
    console.log(error)
  });
}
  