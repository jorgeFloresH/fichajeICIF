//--------------------------Admin------------------------------------//

import axios from 'axios'
import { url } from './http';

// export const urlcountbyAgency='http://servicios-test.catastrocbba.com/apiServices/api/Ticket/CountTicketByAgency/';
// export const urlCountUser = 'http://servicios-test.catastrocbba.com/apiServices/api/Users/UserFilterCount/';
// export const contDasthobar1 ='http://servicios-test.catastrocbba.com/apiServices/countUserWTicket/';

// //----------------------Super Admin--------------------------------
// export const urlA='http://servicios.catastrocbba.com/apiServices/api/Ticket/CountTicketAll'; 
// export const urlU='http://servicios.catastrocbba.com/apiServices/api/Users/UserFilterCountAll';

// peticonGet
export const urlcountbyAgency =(idAgencia)=>{
    return axios.get(`${url}Ticket/CountTicketByAgency/${idAgencia}`).then((response) => {
        return response.data;
        }).catch(error => {
            return error.response.status;
        });
}

// coUGet
export  const urlCountUser = async (idAgencia) => {
    return axios.get(`${url}Users/UserFilterCount/${idAgencia}`).then((response) => {
        return response.data;
    })
  }

  export  const contDasthboard = async (idAgencia) => {
    return axios.get(`${url}countUserWTicket/${idAgencia}`).then((response) => {
        return response.data;
    })
  }

