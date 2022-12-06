import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ListaCargo } from '../global/listarCargo';
import { ListaAgencia } from "../global/listarAgencia";
import { ListaTramites } from "../global/listarTramites";
import { MostrarAlet } from "../global/alertaError";
import { editUser } from "../../services/apiUser";
import { tramiteUser, deleteTramiteUSer, addTramiteUSer } from "../../services/apiUtTramite";

export const ModificarUsuarios = ({ isopen, hideModal, agencia, datosM, actualizar, guardado }) => {

    const [form, setForm] = useState ({
        idUsuario: '',
        nomUsuario: '',
        apePaterno: '',
        apeMaterno:'',
        ciUsuario: '',
        userName:'',
        userPassword:'',
        idPerfil:'',
        idAgencia: ''
    })
    const [cargando, setCargando] = useState(true)
    const [eboton, setEBoton] = useState(false)
    const [tramites, setTramites] = useState([])

    const handleGetCargo = (val) => {
        setForm({...form, idPerfil:val})
    }
    const handleGetAgencia = (val) => {
        setForm({...form, idAgencia:val})
    }
    const handleChange = async (e) =>{
        await setForm({
            ... form,
            [e.target.name] : e.target.value,
        })
    }
    const handleGetTramites = (datos) => {
        setTramites(datos)
    }

    const vaciar = (estado) => {
        setForm({   
            idUsuario: '',  
            nomUsuario: '',
            apePaterno: '',
            apeMaterno:'',
            ciUsuario: '',
            userName:'',
            userPassword:'',
            idPerfil:'',
            idAgencia: ''
        })
        setTramites([])
        setCargando(true)
        setEBoton(false)
        if (estado == 0){
            hideModal()
        }else{
            guardado()
        }
    }
    const validationPut = () => {
        if(!form.nomUsuario || !form.apePaterno || !form.ciUsuario || !form.userName || !form.userPassword)
        {
            MostrarAlet('error', 'ALTO!', 'RELLENE LOS CAMPOS', true, false)
        }
        else{
            if(form.userName.length<=3)
            {
                MostrarAlet('error', 'ALTO!', 'Nombre usuario debe ser mayor a 3 caracteres!', true, false) 
            }
            else{
                if(agencia == 'null'){
                    putUserSuper('super');
                }   
                else{
                    putUserSuper('admin');
                }
            }
        }
    }
    const putUserSuper = async (tipoU) => {
        const res = await editUser(null, null, form, 1)
        if(tipoU == 'super')
        {
            if(res.mensaje == "Actualizado Satisfactoriamente")
            {
                MostrarAlet('success', res.mensaje, false, false, 1500)
                vaciar(1)
            }
            else{
                MostrarAlet('error', 'Error al modificar Usuario', false, true, 1500)
            }
        }
        else{
            if(res.mensaje == "Actualizado Satisfactoriamente")
            {
                editTramitesUser(res.mensaje)
            }
            else{
                MostrarAlet('error', 'Error al modificar Usuario', false, true, 1500)
            }
        }
    }
    const editTramitesUser = async (mostrar) =>
    {
        const newTramites = []
        deleteTramiteUSer(form.idUsuario)
        for(let x = 0; x < tramites.length; x++){
            newTramites.push({
                idUsuario: form.idUsuario,
                idTramite: tramites[x].value
            })
        }
        for(let a = 0; a < tramites.length; a++){
            await addTramiteUSer(newTramites[a])
        }
        MostrarAlet('success', mostrar, false, false, 1500)
        vaciar(1)      
    }

    const cargarDatos = async ()  => {
        setForm({
            idUsuario: datosM.idUsuario,
            nomUsuario: datosM.nomUsuario,
            apePaterno: datosM.apePaterno,
            apeMaterno: datosM.apeMaterno,
            ciUsuario: datosM.ciUsuario,
            userName: datosM.userName,
            userPassword: datosM.userPassword,
            idPerfil: datosM.idPerfil,
            idAgencia: datosM.idAgencia
        })
        const res = await tramiteUser(datosM.idUsuario)
        const op = res.response.map(
            r => ({
                "value": r.idTramite,
				"label": r.nomTramite
            })
        )
        setTramites(op)
        setCargando(false)
    }
    useEffect( () => {
        if (actualizar != 0)
        {
            cargarDatos()
        }       
	}, [actualizar])
    return (
        <Modal isOpen={isopen && !cargando}>
            <ModalHeader style={{ display: 'block' }}>
                Modificar Usuario
                <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => vaciar(0)}><i className="bi bi-x-lg"></i></span>
            </ModalHeader>
            <ModalBody>
                <div className="form-grup">
                    <div className="form-floating mb-3 mt-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Nombre Del Usuario" name="nomUsuario" onChange={(e) => handleChange(e)} value={form.nomUsuario}/>
                        <label htmlFor="floatingInput">Nombre del Usuario</label>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="row g-2">
                        <div className="col form-floating ">
                            <input type="text" className="form-control " id="floatingInput" placeholder="Apellido Paterno" name="apePaterno" onChange={(e) => handleChange(e)} value={form.apePaterno} />
                            <label htmlFor="floatingInput" className="ms-2">Apellido Paterno</label>
                        </div>
                        <div className="col form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Apellido Materno" name="apeMaterno" onChange={(e) => handleChange(e)} value={form.apeMaterno}/>
                            <label htmlFor="floatingInput" className="ms-2">Apellido Materno</label>
                        </div>
                        <div className="form-floating mb-3 mt-2">
                            <input type="number" className="form-control" id="floatingInput" placeholder="C.I" name="ciUsuario" onChange={(e) => handleChange(e)} value={form.ciUsuario} />
                            <label htmlFor="floatingInput">C.I</label>
                        </div>

                    </div>
                </div>

                <div className="form-grup mb-3">
                    <div className="row g-2">
                        <div className="col-8 form-floating">
                            <input className="form-control" type="text" placeholder="userName" name="userName" id="userName" onChange={(e) => handleChange(e)} value={form.userName}/>
                            <label htmlFor="userName" className="ms-2">Nombre de Usuario</label>
                        </div>
                        <ListaCargo idP={form.idPerfil} nomP={datosM.nomTipoP} handleGetCargo={handleGetCargo}></ListaCargo>
                    </div>

                    <div className="row g-2 d-flex">
                        <div className="col form-floating">
                            <input className="form-control" type="text" placeholder="password" name="userPassword" id="userPassword" onChange={(e) => handleChange(e)} value={form.userPassword}/>
                            <label htmlFor="userPassword">Contraseña</label>
                        </div>
                        {agencia != 'null' ?
                            <ListaTramites valores={tramites} control={1} handleGetTramites={handleGetTramites}></ListaTramites>
                            :
                            <ListaAgencia idA={form.idAgencia} nomA={datosM.nomAgencia} handleGetAgencia={handleGetAgencia}></ListaAgencia>
                        }
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" onClick={() => {validationPut();setEBoton(true)}} disabled={eboton?true:false}>Modificar</button>
                <button className="btn btn-danger" onClick={() => vaciar(0)}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}