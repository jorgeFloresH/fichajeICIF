import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import tableIcons from '../../assets/iconos/iconos'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnasUsuario } from '../../components/admin/columnasUsuario';
import { CerrarSesion } from '../../components/global/alertaCerrar';
import { getAll, getFiltroAgencia } from '../../services/apiUser';
import { editUser } from '../../services/apiUser';
import { MostrarAlet } from '../../components/global/alertaError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { tramiteUser } from '../../services/apiUtTramite';


const cookies = new Cookies();

class Usuario extends Component {

    state={
        data:[],
        modalTramite: false,
        tramitesByUser: []
    }

    datosTablaAdmin = async () => {
        const res = await getFiltroAgencia(cookies.get('IdAgencia'))
        this.setState({ data: res.response })
    }

    datosTablaSuperAdmin = async () => {
        const res = await getAll()
        console.log(res.response)
        this.setState({ data: res.response })
    }

    cambiarEstado = async (estado, usuarioId) => {
        const res = await editUser(estado, usuarioId, null, 0)
        if (res.mensaje == 'Actualizado Satisfactoriamente'){
            cookies.get('IdAgencia') != 'null' ? this.datosTablaAdmin() : this.datosTablaSuperAdmin()
        }
        else{
            MostrarAlet('error', 'Ocurrio un error', 'Error al cambiar estado', false, 1500)
        }
    }

    tramitesUsuario = async (usuarioId) => {
        const res = await tramiteUser(usuarioId)
        this.setState({tramitesByUser: res.response})
    }

    componentDidMount(){
        if (cookies.get('IdAgencia') != 'null'){
            this.datosTablaAdmin()
        }
        else{
            this.datosTablaSuperAdmin()
        }
    }

    render() {

        const defaultMaterialTheme = createTheme();
        let columns;
        const c = [
            {
                title:<h4>✔/✖</h4>,
                field:'estado',
                render: (rowData) => (rowData.estado == 1) ? 
                    <button className="btn btn-success" onClick={ async () => await CerrarSesion('Esta seguro de desactivar?', '', 'warning', true, '#3085d6', '#d33', 'Cancelar', 'Si, desactivar!') ? this.cambiarEstado(0, rowData.idUsuario) : console.log("false") }><i className="bi bi-check-square"></i></button> 
                    : 
                    <button className="btn btn-danger" onClick={ async () => await CerrarSesion('Esta seguro de Activar?', '', 'warning', true, '#3085d6', '#d33', 'Cancelar', 'Si, Activar!') ? this.cambiarEstado(1, rowData.idUsuario) : console.log("false") }><i className="bi bi-dash-square"></i></button>
            },{
                title:<h4>EDITAR</h4>,
                render: (rowData) => <button className="btn btn-warning"> <FontAwesomeIcon icon={faEdit}/></button>
            }
        ]
        //Administrador Agencia Dinamica
        if(cookies.get('estadoA') == 1){
            const b = [
                {
                    title:<h4>TRAMITES</h4>,
                    render:(rowData)=><button type="button" className="btn btn-primary" onClick={() => {this.tramitesUsuario(rowData.idUsuario); this.setState({modalTramite: true})}}> Tramites </button>
                }
            ]
            columns = ColumnasUsuario().concat(b, c)
        }
        else{
            //Administrador Agencia Estatica
            if (cookies.get('estadoA') == 0){
                columns = ColumnasUsuario().concat(c)
            }
            else{
                //Super Administrador
                if (cookies.get('IdAgencia') == 'null'){
                    const d = [
                        {
                            title:<h5>Agencia</h5>,
                            render:(rowData) => <b> { rowData.nomAgencia } </b>
                        }
                    ]
                    columns = ColumnasUsuario().concat(c, d)
                }
            }
        }

        return (
            <div className ="container-fluid">
                {cookies.get('estadoA') == 1 &&
                    <h1>Administrador Agencia dinamica</h1>
                }
                {cookies.get('estadoA') == 0 &&
                    <h1>Administrador Agencia Estatica</h1>
                }
                {cookies.get('IdAgencia') == 'null' &&
                    <h1>Super Administrador</h1>
                }
                {/*-------------------------- Boton Agregar -------------------------- */}
                <h1>Usuarios</h1>
                <button type="button" className="btn btn-primary mb-2">Agregar</button>
                <br/>
                {/*-------------------------- Tabla -------------------------- */}
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        icons={tableIcons}
                        columns = {columns}
                        data = {this.state.data}
                        title=''
                    />
                </ThemeProvider>
                {/*-------------------------- Modal Tramites -------------------------- */}
                <Modal isOpen={this.state.modalTramite}>
                    <ModalHeader style={{display: 'block'}}>
                        Tramites del Usuario
                        <span style={{float: 'right',cursor:'pointer'}} onClick={() => this.setState({modalTramite: false})}><i className="bi bi-x-lg"></i></span>
                    </ModalHeader>
                    <ModalBody>
                        <div className ="form-group">					
                            {this.state.tramitesByUser.map( UtT => {
                                return(
                                    <p key={UtT.idUtTramite} style={{color:'#000'}}>{UtT.nomTramite}</p>
                                )
                            })}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-secondary" onClick={() => this.setState({modalTramite: false})}>Cerrar</button>
                    </ModalFooter>	
                </Modal>

            </div>
        )
    }
}
export default Usuario;