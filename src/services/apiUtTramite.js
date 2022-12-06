import axios from "axios";
import { url } from "./http";

//------------/api/UtTramite/Filter_UtTramite/{idUsuario}----------------------GET
export const tramiteUser =(idUsuario)=>{
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
  