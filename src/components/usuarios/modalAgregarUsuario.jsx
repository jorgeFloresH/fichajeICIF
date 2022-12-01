import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ListaCargo } from '../global/listarCargo';
import { ListaAgencia } from "../global/listarAgencia";

export const AgregarUsuario = ({ isopen, hideModal }) => {

    const [cargosId, setCargosId] = useState('')
    const [agenciaId, setAgenciaId] = useState('')
    // const [form, setForm] = useState [{
    //     nombre: '',
    //     apPaterno: '',
    //     apMaterno:'',
    //     usuario:'',
    //     password:'',
    //     idCargo:'',
    //     idAgencia:''
    // }]

    const vaciar = () => {
        hideModal()
    }
    const handleGetCargo = (val) => {
        // setForm({...form, idCargo:val})
    }
    const handleGetAgencia = (val) => {
        // setForm({...form, idAgencia:val})
    }

    return (
        <Modal isOpen={isopen}>
            <ModalHeader style={{ display: 'block' }}>
                Agregar Usuario
                <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => vaciar()}><i className="bi bi-x-lg"></i></span>
            </ModalHeader>
            <ModalBody>
                <div className="form-grup">
                    <div className="form-floating mb-3 mt-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Nombre Del Usuario" />
                        <label htmlFor="floatingInput">Nombre del Usuario</label>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="row g-2">
                        <div className="col form-floating ">
                            <input type="text" className="form-control " id="floatingInput" placeholder="Apellido Paterno" />
                            <label htmlFor="floatingInput" className="ms-2">Apellido Paterno</label>
                        </div>
                        <div className="col form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Apellido Materno" />
                            <label htmlFor="floatingInput" className="ms-2">Apellido Materno</label>
                        </div>
                        <div className="form-floating mb-3 mt-2">
                            <input type="number" className="form-control" id="floatingInput" placeholder="Nombre Del Usuario" />
                            <label htmlFor="floatingInput">C.I</label>
                        </div>

                    </div>
                </div>

                <div className="form-grup mb-3">
                    <div className="row g-2">
                        <div className="col-8 form-floating">
                            <input className="form-control" type="text" placeholder="userName" id="userName" />
                            <label htmlFor="userName" className="ms-2">Nombre de Usuario</label>
                        </div>
                        <ListaCargo handleGetCargo={handleGetCargo}></ListaCargo>
                    </div>

                    <div className="row g-2">
                        <div className="col form-floating">
                            <input className="form-control" type="text" id="userPassword" placeholder="userName" />
                            <label htmlFor="userPassword">Contraseña</label>
                        </div>
                        <ListaAgencia handleGetAgencia={handleGetAgencia}></ListaAgencia>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success">Agregar</button>
                <button className="btn btn-danger" onClick={() => vaciar()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}
