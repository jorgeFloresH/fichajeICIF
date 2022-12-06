import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ListaCargo } from '../global/listarCargo';
import { ListaAgencia } from "../global/listarAgencia";
import { ListaTramites } from "../global/listarTramites";

export const ModificarUsuarios = ({ isopen, hideModal, agencia }) => {
    return (
        <Modal isOpen={isopen}>
            <ModalHeader style={{ display: 'block' }}>
                Modificar Usuario
                <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => hideModal()}><i className="bi bi-x-lg"></i></span>
            </ModalHeader>
            <ModalBody>
                <div className="form-grup">
                    <div className="form-floating mb-3 mt-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Nombre Del Usuario" name="nomUsuario" />
                        <label htmlFor="floatingInput">Nombre del Usuario</label>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="row g-2">
                        <div className="col form-floating ">
                            <input type="text" className="form-control " id="floatingInput" placeholder="Apellido Paterno" name="apePaterno" />
                            <label htmlFor="floatingInput" className="ms-2">Apellido Paterno</label>
                        </div>
                        <div className="col form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Apellido Materno" name="apeMaterno" />
                            <label htmlFor="floatingInput" className="ms-2">Apellido Materno</label>
                        </div>
                        <div className="form-floating mb-3 mt-2">
                            <input type="number" className="form-control" id="floatingInput" placeholder="C.I" name="ciUsuario" />
                            <label htmlFor="floatingInput">C.I</label>
                        </div>

                    </div>
                </div>

                <div className="form-grup mb-3">
                    <div className="row g-2">
                        <div className="col-8 form-floating">
                            <input className="form-control" type="text" placeholder="userName" name="userName" id="userName" />
                            <label htmlFor="userName" className="ms-2">Nombre de Usuario</label>
                        </div>
                        <ListaCargo></ListaCargo>
                    </div>

                    <div className="row g-2 d-flex">
                        <div className="col form-floating">
                            <input className="form-control" type="text" placeholder="password" name="userPassword" id="userPassword" />
                            <label htmlFor="userPassword">Contraseña</label>
                        </div>
                        {agencia != 'null' ?
                            <ListaTramites></ListaTramites>
                            :
                            <ListaAgencia></ListaAgencia>
                        }
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" >Modificar</button>
                <button className="btn btn-danger" onClick={() => hideModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}
