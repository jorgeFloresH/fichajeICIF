import axios from "axios";
import { url } from "./http";

export const peticioneGetUtTByIdTram=(idUsuario)=>{
    return axios.get(`${url}UtTramite/Filter_UtTramite/${idUsuario}`).then(response=>{
        return response.data.response;
    }).catch(error=>{
        console.log(error.message);
    })
}