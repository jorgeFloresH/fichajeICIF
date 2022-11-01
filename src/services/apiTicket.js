
import axios from 'axios'
import { url } from './http';

export const urlcountbyAgency =(idAgencia)=>{
    return axios.get(`${url}Ticket/CountTicketByAgency/${idAgencia}`).then((response) => {
        return response.data;
        }).catch(error => {
            return error.response.status;
        });
}