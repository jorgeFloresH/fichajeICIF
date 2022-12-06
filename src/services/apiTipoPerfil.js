import axios from "axios";
import { url } from "./http";

//---------------Users.js----------------*/
export const peticionePerfilGet = () => {
    return axios.get(`${url}TipoPerfil/`).then(response => {
      return response.data;
    }).catch(error=>{
        console.log(error.message);
    })
}