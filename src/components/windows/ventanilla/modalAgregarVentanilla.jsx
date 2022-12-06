import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';
import { MostrarAlet } from '../../global/alertaError';
import { postAgencia } from '../../../services/apiAgencia';
import { peticionPostVen } from '../../../services/apiVentanilla';
import { addTramiteUSer } from '../../../services/apiUtTramite';
import { ListaTramites } from '../../global/listarTramites';
import { ListaAgencia } from '../../global/listarAgencia';

const cookies = new Cookies();
const idAgen = cookies.get('IdAgencia');
const estadoA = cookies.get('estadoA');

export const AgregarVentanilla = ({isopen, hideModal, guardado, agencia}) => {
    const [ data, setData ] = useState({
        nomVentanilla: '',
        estadoV:1,
        idAgencia:idAgen !='null' ? idAgen:'',
    })
    const [tramites, setTramites] = useState({})

    console.log('data', data)
    const vaciar = (estado) => {
        setData({
            // idVentanilla: '',
            nomVentanilla: '',
            estadoV:1,
            idAgencia:idAgen !='null' ? idAgen:'',
            // nomAgencia:''
        })
        setTramites({})
        if (estado == 0){
            hideModal()
        }else{
            guardado()
        }
    }

    const handleChange = async (e) => {
        await setData({
            ... data,
            [e.target.name] : e.target.value,
        })
    }

    const handleGetAgencia = (val) => {
        setData({...data, idAgencia:val})
    }

    const handleGetTramites = (datos) => {
        setTramites({...tramites, datos})
    }



    const validationPost = () => {
        if(!data.nomVentanilla){
            MostrarAlet('error', 'ALTO!', 'RELLENE LOS CAMPOS!', true, false)
        }
        else{
            if (data.nomVentanilla.length <= 5){
                MostrarAlet('error', 'ALTO!', 'Nombre de la ventanilla debe ser mayor a 5 caracteres!', true, false)
            }
            else{
                if(idAgen == 'null'){
                    if(!data.idAgencia){
                        MostrarAlet('error', 'ALTO!', 'ELIJA UNA AGENCIA', true, false)
                    }
                    else{
                        peticionPost();
                    }
                }   
                else{
                    peticionPost();
                }
            }
        }
    } 

    const peticionPost = async () =>{
        const res = await peticionPostVen(data)
        if(estadoA == 1)
        {
            if (res.mensaje == 'Guardado Satisfactoriamente'){
                MostrarAlet('success', res.mensaje, false, false, 1500)
                vaciar(1)
            }
            else {
                MostrarAlet('error', 'Error al agregar ventanilla', false, true, 1500)
            }
        }
        else{
            if (estadoA == 0) {
                if(res.mensaje == 'Guardado Satisfactoriamente')
                {
                    addTramites(res.mensaje, res.idAgencia)
                }
                else{
                    MostrarAlet('error', 'Error al agregar Usuario', false, true, 1500)
                }
            }
        }

	}

    const addTramites = async (mostrar, idUser) =>
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



    useEffect(() => {
        console.log('ventanilla:', data.idVentanilla)
        console.log('agencia:', idAgen)
        console.log('tramites:', tramites)
    },[tramites])
    

    return (
        <Modal isOpen={isopen}>
            <ModalHeader style={{display: 'block'}}>
                Agregar Ventanilla
                <span style={{float: 'right',cursor:'pointer'}} onClick={() => vaciar(0)}><i className="bi bi-x-lg"></i></span>
            </ModalHeader>
            <ModalBody>
                <div className ="form-group">					
                    <br/>
                    <label htmlFor="floatingInput">Nombre</label>
                    <input className="form-control" type="text" placeholder="Ingrese nombre de Ventanilla" name="nomVentanilla" id="floatingInput" onChange={(e) => handleChange(e)}/>
                    <br/>
                    {idAgen != 'null' ? 
                            <>
                            {estadoA == 0 ? 
                                <>
                                <label htmlFor="nombre">Seleccionar Tramites</label>
                                <br/>
                                <ListaTramites handleGetTramites={handleGetTramites}></ListaTramites>
                                </>
                                :
                                <br/>
                            }
                            </>
                            :
                            <ListaAgencia handleGetAgencia={handleGetAgencia}></ListaAgencia>
                        }


                </div>
            </ModalBody>
            <ModalFooter>
                <button className ="btn btn-success" onClick={ () => validationPost() }>Agregar</button>
                <button className ="btn btn-danger" onClick={ () => vaciar(0) }>Cancelar</button>
            </ModalFooter>	
        </Modal>
    )

}