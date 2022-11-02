import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Swal from "sweetalert2";

import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import tableIcons from '../../assets/iconos/iconos';

// import '../../css/styleDT.css'

const url = 'http://servicios-test.catastrocbba.com/apiServices/api/Agency/';

class Agencia extends Component{
	state = {
		data:[],
		modalInsertar:false,
		// infoAgen:[],
		form:{
			idAgencia:'',
			nomAgencia:'',
			tipoModal:'',
			estado: '',
			mapa:'',
			multimedia:'',
			consulta:''
		}
	}
	
	// peticionGet = async() =>{
	// 	await axios.get(url).then(response => {
	// 		this.setState({data: response.data.response});
	// 		console.log(response.data.response)
	// 	})
	// }
	// peticionGetByIdAgen = async (idAgen) =>{
	// 	await axios.get(url+idAgen).then(response => {
	// 		this.setState({infoAgen: response.data.response});
	// 		console.log("datos de la agencia",response.data.response)
	// 	})
	// }
	peticionPost = async() =>{
		delete this.state.form.id;
		await axios.post(url,this.state.form).then(response =>{
			this.modalInsertar();
			this.peticionGet();
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Registro Guardado',
				showConfirmButton: false,
				timer: 1500
			})

		}).catch(error =>{
			console.log(error.message);
		})
	}

	//function to validate form fields in post method
	validationPost=(form)=>{
		if(form==null ){
		  Swal.fire({
			icon: 'error',
			title: 'ALTO!',
			text: 'RELLENE LOS CAMPOS!'
		  })
		}else{
		  if(form.nomAgencia==null){
			console.log();
			Swal.fire({
			  icon: 'error',
			  title: 'ALTO!',
			  text: 'INGRESE DATOS CORRECTAMENTE!'
			})
		  }else{
			if(form.nomAgencia.length>=5){
				this.peticionPost();
			  }
			  else{
				Swal.fire({
				  icon: 'error',
				  title: 'ALTO!',
				  text: 'Nombre de Agencia debe ser mayor a 5 caracteres!'
				})
			  }
			  
			}
			
		  }
	  }
	
	//function to validate form fields in PUT method
	  validationPut=(form)=>{
		if(form==null ){
		  Swal.fire({
			icon: 'error',
			title: 'ALTO!',
			text: 'RELLENE LOS CAMPOS!'
		  })
		}else{
		  if(form.nomAgencia==null){
			console.log();
			Swal.fire({
			  icon: 'error',
			  title: 'ALTO!',
			  text: 'INGRESE DATOS CORRECTAMENTE!'
			})
		  }else{
			if(form.nomAgencia.length>=5){
				this.peticionPut();
			  }
			  else{
				Swal.fire({
				  icon: 'error',
				  title: 'ALTO!',
				  text: 'Nombre de Agencia debe ser mayor a 5 caracteres!'
				})
			  }
			  
			}
			
		  }
		
	  }

	peticionAPut=(idput)=>{
		const aput = { estado: 0 ,idAgencia:idput};
		axios.put(url,aput).then(response=>{
		  this.peticionGet();
	
		}).catch(error=>{
		  console.log(error.message);
		})
	}
	peticionDPut=(idput)=>{
		
		const aput = { estado: 1 ,idAgencia:idput};
		axios.put(url,aput).then(response=>{
		  this.peticionGet();
	
		}).catch(error=>{
		  console.log(error.message);
		})
	}
	

	peticionPut=()=>{
		console.log(this.state.form)
		axios.put(url,this.state.form).then(repsonse=>{
			this.modalInsertar();
			this.peticionGet();
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Registro Actualizado',
				showConfirmButton: false,
				timer: 1500
			})
		})
	}

	confirmacionActive=(op)=>{
		Swal.fire({
		  title: 'Esta seguro de desactivar?',
		  text: "",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, desactivar!'
		}).then((result) => {
		  if (result.isConfirmed) {
			Swal.fire({
				  icon: 'success',
				  title: 'Desactivado',
				  showConfirmButton: false,
				  timer: 1500
				})
			this.peticionAPut(op);
		  }
		})
	}
	confirmacionDesactive=(op)=>{
		Swal.fire({
		  title: 'Esta seguro de Activar?',
		  text: "",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, Activar!'
		}).then((result) => {
		  if (result.isConfirmed) {
			Swal.fire({
				  icon: 'success',
				  title: 'Activado',
				  showConfirmButton: false,
				  timer: 1500
				})
			this.peticionDPut(op);
		  }
		})
	}

	// modalInsertar = () =>{
	// 	this.setState({modalInsertar: !this.state.modalInsertar});
	// }

	seleccionarAgencia = (Agencia) =>{
		this.setState({
			tipoModal:'actualizar',
			form:{
				idAgencia:Agencia.idAgencia,
				nomAgencia:Agencia.nomAgencia,
				estado: Agencia.estado,
				mapa:Agencia.mapa,
				multimedia:Agencia.multimedia,
				consulta:Agencia.consulta,
			}
		})
	}

	handleChange =async e =>{
		console.log(e.target.value)
		e.persist();
		await this.setState({
			form:{
				...this.state.form,
				[e.target.name]:e.target.value,
				//id_agencia:this.state.form.id
			}
		});
		console.log(this.state.form);
	}


	componentDidMount(){
		this.peticionGet();
	}

	render(){
		
		const columns = [
			{
				title: <b>N°</b>,
				render: rowData => rowData.tableData.id + 1 
			},{
				title: <h4>Nombre Agencia</h4>,
				field:'nomAgencia'
				
			},{
				title: <h4>Estado</h4>,
				type:'numeric',
				field:'estado',
				render:(rowData)=>rowData.estado==1 ? 
					<button className="btn btn-success" onClick={()=>this.confirmacionActive(rowData.idAgencia)}> <i className="bi bi-check-square"></i></button> : 
					<button className="btn btn-danger" onClick={()=>this.confirmacionDesactive(rowData.idAgencia)}> <i className="bi bi-dash-square"></i></button>
			},{
				title:<h4>Editar</h4>,
				render:(rowData)=><button className="btn btn-warning" onClick ={()=>{this.seleccionarAgencia(rowData);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
			}
		]
		
		const defaultMaterialTheme = createTheme();
		// const {data} = this.state
		// const {form} = this.state;

		return(
			<div className ="container">
			<h1 className="tit">Agencias</h1>
			
				<button type="button" className="btn btn-primary"  onClick={()=>{this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}}>Agregar</button>
		
			<div className="container-fluid pt-3">
				<ThemeProvider theme={defaultMaterialTheme}>
					<MaterialTable
						icons={tableIcons}
						columns = {columns}
						data={this.state.data}
						title=''
					/>
				</ThemeProvider>
   
				</div>
				<Modal isOpen={this.state.modalInsertar}>
					<ModalHeader style={{display: 'block'}}>
					Ventana Usuarios
					<span style={{float: 'right',cursor:'pointer'}} onClick={()=>this.modalInsertar()}><i className="bi bi-x-lg"></i></span>
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
								<option>{form.estado == 0 ? 'Estatica':'Dinamica'}</option>
								{ form.estado == 0 &&
  								<option value='1'>Dinamica</option>
								}
								{form.estado == 1 &&
  								<option value='0'>Estatica</option>
								}
							</select>
						</div>
						<br/>
						<ul>
							<li>
								<input className="form-check-input" type="checkbox" name="mapa" id="" onChange={this.handleChange} value={this.state.form.mapa == '1' ? '0':'1'} checked ={this.state.form.mapa == '1' ? true:false}/> Mapa
							</li>
							<li>
								<input className="form-check-input" type="checkbox" name="multimedia" id="" onChange={this.handleChange} value={this.state.form.multimedia == '1' ? '0':'1'} checked ={this.state.form.multimedia == '1' ? true:false} /> Multimedia
							</li>
							<li>
								<input className="form-check-input" type="checkbox" name="consulta" id=""  onChange={this.handleChange} value={this.state.form.consulta == '1' ? '0':'1'} checked ={this.state.form.consulta == '1' ? true:false}/> Consulta
							</li>
						</ul>
					</ModalBody>
					<ModalFooter>
						{this.state.tipoModal==='insertar'?
							<button className ="btn btn-success" onClick={()=>this.validationPost(form)}>Insertar</button>:
							<button className ="btn btn-primary" onClick={()=>this.validationPut(form)}>Actualizar</button>
						}
						<button className ="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
					</ModalFooter>	
				</Modal>
			{/*modal de informacion*/ }
				{/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title text-uppercase" id="exampleModalLabel">{this.state.infoAgen.nomAgencia}</h5>
				        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div className="modal-body">
				      <p>Supervisor(es): </p>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
				        <button type="button" className="btn btn-primary">okiDoki</button>
				      </div>
				    </div>
				  </div>
				</div> */}
			
			</div>
			)
	}
}
export default Agencia;