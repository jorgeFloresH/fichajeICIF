import axios from "axios";
import { url } from "./http";

//------------/api/UtTramite/Filter_UtTramite/{idUsuario}----------------------
export const tramiteUser =(idUsuario)=>{
    return axios.get(`${url}UtTramite/Filter_UtTramite/${idUsuario}`).then(response=>{
        return response.data;
    }).catch(error=>{
        console.log(error.message);
    })
}