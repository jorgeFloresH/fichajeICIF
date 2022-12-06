import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';
import { MostrarAlet } from '../../global/alertaError';
import { postAgencia } from '../../../services/apiAgencia';
import { ListaTramites } from '../../global/listarTramites';
import { ListaAgencia } from '../../global/listarAgencia';

const cookies = new Cookies();
const agencia = cookies.get('IdAgencia');
const estadoA = cookies.get('estadoA');

export const AgregarVentanilla = ({isopen, hideModal, guardado, tipo}) => {
    const [ data, setData ] = useState({
        idVentanilla: '',
        nomVentanilla: '',
        estadoV: 1,
        idAgencia:'',
        tipoAgencia:null
    })
    const handleChange = async (e) => {
        await setData({
            ...data,
            [e.target.name]: e.target.value,
            estadoV: 1,
        });

    }

    const [tramites, setTramites] = useState({})

    const validationPost = () => {
        if(data.nomVentanilla == ''){
            MostrarAlet('error', 'ALTO!', 'RELLENE LOS CAMPOS!', true, false)
        }
        else{
            if (data.nomVentanilla.length >= 5){
                peticionPost()
            }
            else{
                MostrarAlet('error', 'ALTO!', 'Nombre de la ventanilla debe ser mayor a 5 caracteres!', true, false)
            }
        }
    } 

    const peticionPost = async () =>{
        // delete this.state.form.id;
        const res = await postAgencia(data)
        if (res.mensaje == 'Guardado Satisfactoriamente'){
            MostrarAlet('success', res.mensaje, false, false, 1500)
            vaciar(1)
            guardado()

        }
        else {
            MostrarAlet('error', 'Error al crear la ventanilla', false, false, 1500)
        }
	}

    const vaciar = (estado) => {
        setData({
            idVentanilla: '',
            nomVentanilla: '',
            idAgencia: ''
        })
        hideModal()
    }
    const handleGetAgencia = (val) => {
        setData({...data, idAgencia:val})
    }
    const handleGetTramites = (datos) => {
        setTramites({...tramites, datos})
    }

    useEffect(() => {
        console.log('ventanilla:', data.idVentanilla)
        console.log('agencia:', data.idAgencia)
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
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" placeholder="Ingrese nombre de Ventanilla" name="nomVentanilla" id="nomVentanilla" onChange={(e) => handleChange(e)}/>
                    <br/>
                    {estadoA == 0 ? 
                        <>
                        <label htmlFor="nombre">Seleccionar Tramites</label>
                        <br/>
                        <ListaTramites handleGetTramites={handleGetTramites}></ListaTramites>
                        </>
                        :
                        <br/>
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