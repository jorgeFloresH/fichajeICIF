import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MostrarAlet } from '../../components/global/alertaError'



export class AgregarAgencia extends Component {

    state = {
		form:{
			idAgencia:'',
			nomAgencia:'',
			estado: '',
			mapa:'0',
			multimedia:'0',
			consulta:'0'
		}
	}
    
    hola = () =>{
        MostrarAlet('success', `Bienvenido`, `Funciona`, false, 1500)
    }

    handleChange =async e =>{
		e.persist();
		await this.setState({
			form:{
				...this.state.form,
				[e.target.name]:e.target.value,
			}
		});
		console.log(this.state.form);
	}

    vaciar =  () => {
        this.setState({
            form:{
                idAgencia:'',
                nomAgencia:'',
                estado: '',
                mapa:'0',
                multimedia:'0',
                consulta:'0'
            }
        })
    }

    render() {
        const {form} = this.state;

        return (
            <Modal isOpen={this.props.isopen}>
                {this.props.children}
                <ModalHeader style={{display: 'block'}}>
                    Agregar Agencia
                    <span style={{float: 'right',cursor:'pointer'}} onClick={this.props.hideModal}><i className="bi bi-x-lg"></i></span>
                </ModalHeader>
                <ModalBody>
                    <div className ="form-group">					
                        <br/>
                        <label htmlFor="nom_agencia">Nombre</label>
                        <input className="form-control" type="text" name="nomAgencia" id="nomAgencia" onChange = {this.handleChange} value ={form?form.nomAgencia:''}/>
                        <br/>
                        <label htmlFor="nom_agencia">Tipo Agencia</label>
                        <br/>
                        <select onChange={this.handleChange} name='estado'>
                            <option>Elija tipo agencia</option>
                            <option value='1'>Dinamica</option>
                            <option value='0'>Estatica</option>
                        </select>
                    </div>
                    <br/>
                    <ul>
                        <li>
                            <input className="form-check-input" type="checkbox" name="mapa" id="" onChange={this.handleChange} value={this.state.form.mapa == '1' ? '0':'1'}/> Mapa
                        </li>
                        <li>
                            <input className="form-check-input" type="checkbox" name="multimedia" id="" onChange={this.handleChange} value={this.state.form.multimedia == '1' ? '0':'1'} /> Multimedia
                        </li>
                        <li>
                            <input className="form-check-input" type="checkbox" name="consulta" id=""  onChange={this.handleChange} value={this.state.form.consulta == '1' ? '0':'1'}/> Consulta
                        </li>
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <button className ="btn btn-success" onClick={this.hola}>Mostrar</button>
                    <button className ="btn btn-danger" onClick={this.props.hideModal}>Cancelar</button>
                </ModalFooter>	
            </Modal>
        )
    }
}

export default AgregarAgencia