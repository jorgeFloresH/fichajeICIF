import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ListaCargo } from '../global/listarCargo';
import { ListaAgencia } from "../global/listarAgencia";
import { ListaTramites } from "../global/listarTramites";
import { MostrarAlet } from "../global/alertaError";
import { addUser } from "../../services/apiUser";
import { addTramiteUSer } from "../../services/apiUtTramite";

export const AgregarUsuario = ({ isopen, hideModal, agencia, guardado }) => {

    const [form, setForm] = useState ({
        nomUsuario: '',
        apePaterno: '',
        apeMaterno:'',
        ciUsuario: '',
        userName:'',
        userPassword:'',
        idPerfil:'',
        idAgencia: agencia !='null' ? agencia:'',
        estado: 1,
    })
    const [tramites, setTramites] = useState({})

    const vaciar = (estado) => {
        setForm({
            nomUsuario: '',
            apePaterno: '',
            apeMaterno:'',
            ciUsuario: '',
            userName:'',
            userPassword:'',
            idPerfil:'',
            idAgencia:agencia !='null' ? agencia:'',
            estado: 1,
        })
        setTramites({})
        if (estado == 0){
            hideModal()
        }else{
            guardado()
        }
    }
    const handleGetCargo = (val) => {
        setForm({...form, idPerfil:val})
    }
    const handleGetAgencia = (val) => {
        setForm({...form, idAgencia:val})
    }
    const handleGetTramites = (datos) => {
        setTramites({...tramites, datos})
    }
    const handleChange = async (e) =>{
        await setForm({
            ... form,
            [e.target.name] : e.target.value,
        })
    }

    const validacionUser = async () => {
        if(!form.nomUsuario || !form.apePaterno || !form.ciUsuario || !form.userName || !form.userPassword)
        {
            MostrarAlet('error', 'ALTO!', 'RELLENE LOS CAMPOS', true, false)
        }
        else{
            if(!form.idPerfil){
                MostrarAlet('error', 'ALTO!', 'ELIJA UN CARGO', true, false)
            }
            else{
                if(form.userName.length<=3)
                {
                    MostrarAlet('error', 'ALTO!', 'Nombre usuario debe ser mayor a 3 caracteres!', true, false) 
                }
                else{
                    if(agencia == 'null'){
                        if(!form.idAgencia){
                            MostrarAlet('error', 'ALTO!', 'ELIJA UNA AGENCIA', true, false)
                        }
                        else{
                            postUserSuper('super');
                        }
                    }   
                    else{
                        postUserSuper('admin');
                    }
                }
            }
        }
    }

    const postUserSuper = async (tipoU) => {
        const res = await addUser(form)
        if(tipoU == 'super')
        {
            if(res.mensaje == 'Guardado Satisfactoriamente')
            {
                MostrarAlet('success', res.mensaje, false, false, 1500)
                vaciar(1)
            }
            else{
                MostrarAlet('error', 'Error al agregar Usuario', false, true, 1500)
            }
        }
        else{
            if(res.mensaje == 'Guardado Satisfactoriamente')
            {
                addTramitesUser(res.mensaje, res.idUsuario)
            }
            else{
                MostrarAlet('error', 'Error al agregar Usuario', false, true, 1500)
            }
        }
        
    }
    const addTramitesUser = async (mostrar, idUser) =>
    {
        const addTramites = []
        if(!tramites.datos)
        {
            MostrarAlet('success', mostrar, false, false, 1500)
            vaciar(1)
        }
        else{
            for(let i = 0; i < tramites.datos.length; i++){
                addTramites.push({
                    idUsuario: idUser,
                    idTramite: tramites.datos[i].value
                })
            }
            for(let a = 0; a < addTramites.length; a++){
                await addTramiteUSer(addTramites[a])
            }
            MostrarAlet('success', mostrar, false, false, 1500)
            vaciar(1)
        }        
    }

    return (
        <Modal isOpen={isopen}>
            <ModalHeader style={{ display: 'block' }}>
                Agregar Usuario
                <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => vaciar(0)}><i className="bi bi-x-lg"></i></span>
            </ModalHeader>
            <ModalBody>
                <div className="form-grup">
                    <div className="form-floating mb-3 mt-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Nombre Del Usuario" name="nomUsuario" onChange={(e) => handleChange(e)}/>
                        <label htmlFor="floatingInput">Nombre del Usuario</label>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="row g-2">
                        <div className="col form-floating ">
                            <input type="text" className="form-control " id="floatingInput" placeholder="Apellido Paterno" name="apePaterno" onChange={(e) => handleChange(e)}/>
                            <label htmlFor="floatingInput" className="ms-2">Apellido Paterno</label>
                        </div>
                        <div className="col form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Apellido Materno" name="apeMaterno" onChange={(e) => handleChange(e)}/>
                            <label htmlFor="floatingInput" className="ms-2">Apellido Materno</label>
                        </div>
                        <div className="form-floating mb-3 mt-2">
                            <input type="number" className="form-control" id="floatingInput" placeholder="C.I" name="ciUsuario" onChange={(e) => handleChange(e)}/>
                            <label htmlFor="floatingInput">C.I</label>
                        </div>

                    </div>
                </div>
                                                                        
                <div className="form-grup mb-3">
                    <div className="row g-2">
                        <div className="col-8 form-floating">
                            <input className="form-control" type="text" placeholder="userName" name="userName" id="userName" onChange={(e) => handleChange(e)} />
                            <label htmlFor="userName" className="ms-2">Nombre de Usuario</label>
                        </div>
                        <ListaCargo handleGetCargo={handleGetCargo}></ListaCargo>
                    </div>

                    <div className="row g-2 d-flex">
                        <div className="col form-floating">
                            <input className="form-control" type="text" placeholder="password" name="userPassword" id="userPassword" onChange={(e) => handleChange(e)}/>
                            <label htmlFor="userPassword">Contraseña</label>
                        </div>
                        {agencia != 'null' ? 
                            <ListaTramites handleGetTramites={handleGetTramites}></ListaTramites>
                            :
                            <ListaAgencia handleGetAgencia={handleGetAgencia}></ListaAgencia>
                        }
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" onClick={() => validacionUser()}>Agregar</button>
                <button className="btn btn-danger" onClick={() => vaciar(0)}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}