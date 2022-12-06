import axios from "axios";
import { url } from "./http";

//Get Requisito
export const peticionGetRequisito=()=>{
    return axios.get(`${url}Requisitos/`).then((response) => {
        return response.data.response;
        }).catch(error => {
            return error.response.status;
        });
}

//Post Requisito
export const peticionPostRequisito=(idRequisito)=>{
    return axios.post(`${url}Requisitos/`, idRequisito).then((response) => {
        return response.data;
        }).catch(error => {
            console.log(error.message);
        });
}

//Put Requisito
export const peticionPutRequisito=(idRequisito)=>{
    return axios.put(`${url}Requisitos/`, idRequisito).then((response) => {
        return response.data;
        }).catch(error => {
            console.log(error.message);
        });
}

//Delete Requisito
export const peticionDeleteRequisito=(idRequisito)=>{
    return axios.delete(`${url}Requisitos/${idRequisito}`).then((response) => {
        return response.data;
        }).catch(error => {
            return error.response.status;
        });
}

