
import axios from 'axios'
import { url } from './http';

//------------/api/Ticket/CountTicketByAgency/{agencia}----------------------GET
export const urlcountbyAgency =(idAgencia)=>{
    return axios.get(`${url}Ticket/CountTicketByAgency/${idAgencia}`).then((response) => {
        return response.data;
        }).catch(error => {
            console.log(error)
        });
}