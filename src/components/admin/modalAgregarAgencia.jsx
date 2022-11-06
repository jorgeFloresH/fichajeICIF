import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MostrarAlet } from '../../components/global/alertaError'
import { postAgencia } from '../../services/apiAgencia'

export const AgregarAgencia = ({isopen, hideModal, guardado}) => {
    
    const [ data, setData ] = useState({
        nomAgencia:'',
        estado:'',
        mapa:'0',
        multimedia:'0',
        consulta:'0',
    })

    
    const handleChange = async (e) =>{
        await setData({
            ... data,
            [e.target.name] : e.target.value,
        })
    }

    const validationPost = () => {
        if(data.nomAgencia == '' || data.estado == ''){
            MostrarAlet('error', 'ALTO!', 'RELLENE LOS CAMPOS!', true, false)
        }
        else{
            if (data.nomAgencia.length >= 5){
                peticionPost()
            }
            else{
                MostrarAlet('error', 'ALTO!', 'Nombre de Agencia debe ser mayor a 5 caracteres!', true, false)
            }
        }
    } 

    const peticionPost = async () =>{
        console.log(data)
        const res = await postAgencia(data)
        if (res.mensaje == 'Guardado Satisfactoriamente'){
            MostrarAlet('success', res.mensaje, false, false, 1500)
            vaciar(1)
            guardado()
        }
        else {
            MostrarAlet('error', 'Error al crear agencia', false, false, 1500)
        }
	}

    const vaciar = (estado) => {
        setData({
            nomAgencia:'',
            estado: '',
            mapa:'0',
            multimedia:'0',
            consulta:'0'
        })
        if(estado == 0){
            hideModal()
        }
    }
    return (
        <Modal isOpen={isopen}>
            <ModalHeader style={{display: 'block'}}>
                Agregar Agencia
                <span style={{float: 'right',cursor:'pointer'}} onClick={() => vaciar(0)}><i className="bi bi-x-lg"></i></span>
            </ModalHeader>
            <ModalBody>
                <div className ="form-group">					
                    <br/>
                    <label htmlFor="nom_agencia">Nombre</label>
                    <input className="form-control" type="text" name="nomAgencia" id="nomAgencia" onChange={(e) => handleChange(e)}/>
                    <br/>
                    <label htmlFor="nom_agencia">Tipo Agencia</label>
                    <br/>
                    <select name='estado' onChange={(e) => handleChange(e)}>
                        <option value=''>Elija tipo agencia</option>
                        <option value='1'>Dinamica</option>
                        <option value='0'>Estatica</option>
                    </select>
                </div>
                <br/>
                <ul>
                    <li>
                        <input className="form-check-input" type="checkbox" name="mapa" onChange={(e) => handleChange(e)}  value={data.mapa === '1' ? '0':'1'} /> Mapa
                    </li>
                    <li>
                        <input className="form-check-input" type="checkbox" name="multimedia" onChange={(e) => handleChange(e)} value={data.multimedia === '1' ? '0':'1'} /> Multimedia
                    </li>
                    <li>
                        <input className="form-check-input" type="checkbox" name="consulta" onChange={(e) => handleChange(e)}  value={data.consulta === '1' ? '0':'1'} /> Consulta
                    </li>
                </ul>
            </ModalBody>
            <ModalFooter>
                <button className ="btn btn-success" onClick={ () => validationPost() }>Agregar</button>
                <button className ="btn btn-danger" onClick={ () => vaciar(0) }>Cancelar</button>
            </ModalFooter>	
        </Modal>
    )
}
