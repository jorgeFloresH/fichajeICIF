import axios from 'axios';
import { url } from './http'


export const loginVer = async (nombre, pass) => {
    // try{
    //     const res = await axios.get(url+'Users/' + nombre + '/' + pass)
    //     if (Object.keys(res.data.usuarios).length === 0){
    //         return("Credenciales incorrectas")
    //     }
    //     else{
    //         return(res.data.usuarios[0])
    //     }
    // }catch (err) {
    //     console.error(err);
    // }
    
    return axios.get(`${url}Users/${nombre}/${pass}`).then((response) => {
        return response.data.usuarios[0]
      }).catch(error => {
        return error.response.status
      });
    

    // try {
    //     const response = await fetch(`${url}Users/${nombre}/${pass}`, {
    //       method: 'GET',
    //       headers: { "Content-Type": "application/json" }
    //     });
      
    //     if (response.ok) {
    //         const result = await response.json();
    //         if (Object.keys(result.usuarios).length === 0){
    //             return("Credenciales incorrectas")
    //         }
    //         else{
    //             return(result.usuarios[0])
    //         }
    //     }
    // } catch (err) {
    //     console.error(err);
    // }
}
