import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import tableIcons from '../../assets/iconos/iconos';

import { AgregarAgencia } from '../../components/admin/modalAgregarAgencia'
import { getAgenciaAll, editAgencia } from '../../services/apiAgencia'
import { CerrarSesion } from '../../components/global/alertaCerrar'
import { MostrarAlet } from '../../components/global/alertaError'
import { EditarAgencia } from '../../components/admin/modalEditarAgencia'

class Agencia extends Component{
    state = {
		data:[],
		modalInsertar:false,
        modalModificar:false,
        form:{
            idAgencia:'',
            nomAgencia:'',
            estado:'',
            mapa:'',
            multimedia:'',
            consulta:'',
        }
	}

    peticionGet = async() =>{
        const res = await getAgenciaAll()
        this.setState({data: res.response}) 
	}

    cambiarEstado = async (estado, id) => {
        const res = await editAgencia(estado, id, null, 0)
        if (res.mensaje == 'Actualizado Satisfactoriamente'){
            this.peticionGet();
        }
        else{
            MostrarAlet('error', 'Ocurrio un error', 'Error al cambiar estado', false, 1500)
        }
    }

    seleccionarAgencia = (Agencia) =>{
		this.setState({
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

    componentDidMount(){
		this.peticionGet();
	}

    render(){
        {/*-------------------------- Columnas Tabla -------------------------- */}
        const columns = [
			{
				title: <b>N°</b>,
				render: rowData => rowData.tableData.id + 1 
			},{
				title: <h4>Nombre Agencia</h4>,
				field:'nomAgencia'
				
			},{
				title: <h4>T. Agencia</h4>,
				type:'numeric',
				field:'estado',
				render: (rowData) => rowData.estado == 1 ?
                    <button className="btn btn-success" onClick={ async () => await CerrarSesion('Esta seguro de desactivar?', '', 'warning', true, '#3085d6', '#d33', 'Cancelar', 'Si, desactivar!') ? this.cambiarEstado(0, rowData.idAgencia) : console.log("false") }> <i className="bi bi-check-square"></i></button> : 
                    <button className="btn btn-danger" onClick={ async () => await CerrarSesion('Esta seguro de Activar?', '', 'warning', true, '#3085d6', '#d33', 'Cancelar', 'Si, Activar!') ? this.cambiarEstado(1, rowData.idAgencia) : console.log("false") }> <i className="bi bi-dash-square"></i></button>
			},{
				title:<h4>Editar</h4>,
				render:(rowData)=><button className="btn btn-warning" onClick ={async () => {await this.seleccionarAgencia(rowData); this.setState({modalModificar: true})}}><FontAwesomeIcon icon={faEdit}/></button>
			}
		]
		const defaultMaterialTheme = createTheme();
        return(
            <>
                {/*-------------------------- Modal Agregar -------------------------- */}
                <AgregarAgencia
                    isopen = {this.state.modalInsertar}
                    hideModal = {async () => await this.setState({modalInsertar: false})}
                    guardado = { async () => {await this.setState({modalInsertar: false});this.peticionGet()}}
                />
                    {/*-------------------------- Modal Editar -------------------------- */}
                <EditarAgencia
                    isopen = {this.state.modalModificar}
                    datos = {this.state.form}
                    hideModal = {async () => await this.setState({modalModificar: false})}
                    modificado = { async () => {await this.setState({modalModificar: false});this.peticionGet()}}
                />
                <div className ="container">
                    {/*-------------------------- Boton Agregar -------------------------- */}
                    <h1 className="tit">Agencias</h1>
                    <button type="button" className="btn btn-primary"  onClick={async () => await this.setState({modalInsertar: true})}>Agregar</button>
                    {/*-------------------------- Tabla -------------------------- */}
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
                </div>
            </>
	    )
    }
}
export default Agencia;