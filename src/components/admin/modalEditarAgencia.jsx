import React, {useEffect, useState} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { MostrarAlet } from '../global/alertaError';
import { editAgencia } from '../../services/apiAgencia';

export const EditarAgencia = ({isopen, hideModal, datos, modificado}) => {

    const [data, setData] = useState({
        idAgencia:'',
        nomAgencia:'',
        estado:'',
        mapa:'',
        multimedia:'',
        consulta:'',
    });

    const validationPut = () => {
        if(data.nomAgencia == ''){
            MostrarAlet('error', 'ALTO!', 'INGRESE DATOS CORRECTAMENTE', false, false)
        }
        else{
            if(data.nomAgencia.length >= 5){
                peticionPut()
            }
            else{
                MostrarAlet('error', 'ALTO!','Nombre de Agencia debe ser mayor a 5 caracteres!', false, false)
            }
        }
    } 
    const peticionPut = async () => {
        const res = await editAgencia(null, null, data, 1)
        if (res.mensaje == 'Actualizado Satisfactoriamente'){
            MostrarAlet('success', res.mensaje, 'Agencia Actualizada', false, 1500)
            modificado()
        }
        else{
            MostrarAlet('error', 'Ocurrio un error', 'Error al actualizar agencia', false, 1500)
        }
    }

    useEffect( ()=>{
        setData({
            idAgencia: datos.idAgencia,
            nomAgencia: datos.nomAgencia,
            estado: datos.estado,
            mapa: datos.mapa,
            multimedia: datos.multimedia,
            consulta: datos.consulta,
        })
	}, [datos])
    
    return (
        <Modal isOpen={isopen}>
            <ModalHeader style={{display: 'block'}}>
                Editar Agencia
                <span style={{float: 'right',cursor:'pointer'}} onClick={() => hideModal()}><i className="bi bi-x-lg"></i></span>
            </ModalHeader>
            <ModalBody>
                <div className ="form-group">					
                    <br/>
                    <label htmlFor="nom_agencia">Nombre</label>
                    <input className="form-control" type="text" name="nomAgencia" id="nomAgencia" onChange={(e) => (setData({...data, nomAgencia: e.target.value}))} value={data.nomAgencia}/>
                    <br/>
                    <label htmlFor="nom_agencia">Tipo Agencia</label>
                    <br/>
                    <select onChange={(e) => (setData({...data, estado: e.target.value}))} name='estado'>
                        <option>{data.estado == 0 ? 'Estatica':'Dinamica'}</option>
						{ data.estado == 0 &&
                            <option value='1'>Dinamica</option>
                        }
                        {data.estado == 1 &&
                            <option value='0'>Estatica</option>
                        }
                    </select>
                </div>
                <br/>
                <ul>
                    <li>
                        <input className="form-check-input" type="checkbox" name="mapa" onChange={(e) => (setData({...data, mapa:e.target.value}))} value={data.mapa == '1' ? '0':'1'} checked ={data.mapa == '1' ? true:false}/> Mapa
                    </li>
                    <li>
                        <input className="form-check-input" type="checkbox" name="multimedia" onChange={(e) => (setData({...data, multimedia:e.target.value}))} value={data.multimedia == '1' ? '0':'1'} checked ={data.multimedia == '1' ? true:false}/> Multimedia
                    </li>
                    <li>
                        <input className="form-check-input" type="checkbox" name="consulta" onChange={(e) => (setData({...data, consulta:e.target.value}))} value={data.consulta == '1' ? '0':'1'} checked ={data.consulta == '1' ? true:false}/> Consulta
                    </li>
                </ul>
            </ModalBody>
            <ModalFooter>
                <button className ="btn btn-primary" onClick={() => validationPut()}>Actualizar</button>
                <button className ="btn btn-danger" onClick={() => hideModal()}>Cancelar</button>
            </ModalFooter>	
        </Modal>
    )
}
