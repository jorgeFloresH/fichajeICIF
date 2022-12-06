import React, {Component } from 'react'
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from "material-table";
import Cookies from 'universal-cookie';
import '../../styles/estiloWindows.css';
import tableIcons from '../../assets/iconos/iconos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ColumnasVentanilla } from '../../components/windows/ventanilla/columnasVentanilla';

import { AgregarVentanilla } from '../../components/windows/ventanilla/modalAgregarVentanilla';
import { peticionGetIdAge , peticionGetVentanillaSuperAdmin} from '../../services/apiVentanilla';

const defaultMaterialTheme = createTheme();
const cookies = new Cookies();
const agencia = cookies.get('IdAgencia');
const estadoA = cookies.get('estadoA');

export class Ventanilla extends Component {
  state = {
    data:[],
    modalInsertar:false,
    form: {
      idVentanilla: '',
      nomVentanilla: '',
      estadoV: 1,
    }
  }

  handleGetVentanillaIdAg = async () => {
    const res = await peticionGetIdAge(agencia);
    this.setState({ data: res.response });
  }

  handlePeticionGetSuperAdmin = async() => {
    const res = await peticionGetVentanillaSuperAdmin(agencia);
    this.setState({ data: res });
  }

  componentDidMount() {
    if (cookies.get('IdAgencia') != 'null'){
      this.handleGetVentanillaIdAg();
    }
    else{
        this.handlePeticionGetSuperAdmin()
    }

  }

  render() {

    const defaultMaterialTheme = createTheme();
    let columns;
    const c = [{
        title: <h4>✔/✖</h4>,
        field:'estadoV',
        render:(rowData)=>(rowData.estadoV) ? <button className="btn btn-success" onClick={() => this.confirmacionActive(rowData.idVentanilla)}><i className="bi bi-check-square"></i></button> : <button className="btn btn-danger" onClick={() => this.confirmacionDesactive(rowData.idVentanilla)}><i className="bi bi-dash-square"></i></button>
      },{
        title: <h4>En Uso</h4>,
        field:'estadoV',
        render:(rowData)=>(rowData.estadoV == 3) ? <button className="btn btn-info" onClick={() => this.confirmacionDesactive(rowData.idVentanilla)}><i className="bi bi-check-all"></i></button> : <button className="btn btn-dark"><i className="bi bi-x"></i></button>
      },{
        title:<h4>EDITAR</h4>,
        render:(rowData)=><button className="btn btn-warning" onClick={() => { this.seleccionarVentanilla(rowData); this.modalInsertar(); this.handlePeticioneGetUtTByIdUser(rowData.idVentanilla)}}><FontAwesomeIcon icon={faEdit} /></button>
      }
    ]

    //Administrador Agencia Dinamica
    if(cookies.get('estadoA') == 1){
      const b = [
        {
          title:<h4>Tramites</h4>,
          render:(rowData)=><button type="button" className="btn btn-primary" data-bs-toggle="modal" onClick={() => this.handlePeticioneGetUtTByIdUser(rowData.idVentanilla)} data-bs-target="#exampleModal">
                    Tramites
                  </button>
        }
      ]
      columns = ColumnasVentanilla().concat(b, c)
  }
  else{
      //Administrador Agencia Estatica
      if (cookies.get('estadoA') == 0){
          columns = ColumnasVentanilla().concat(c)
      }
      else{
          //Super Administrador
          if (cookies.get('IdAgencia') == 'null'){
              const d = [
                {
                  title:<h4>AGENCIA</h4>,
                  field:'nomAgencia',
                  render:(rowData)=><b>{rowData.nomAgencia}</b>
                }
              ]
              columns = ColumnasVentanilla().concat(c, d)
          }
      }
  }
    return (
      <div className="container-fluid mt-2">
        <h1>Ventanilla </h1>
        <br />
        <div className="btnnavmulti">
          <button type="button" className="btn btn-primary mb-2" onClick={async () => await this.setState({modalInsertar: true})}>Agregar</button>
          <nav className="navmulti">
            <Link className="a2 activemulti" href="">Ventanillas </Link>
            <Link className="a2" to={'/a/multimedia'}>Multimedia</Link>
            <Link className="a2" to={'/a/tramite'}>Tramites</Link>
            <Link className="a2" to={'/a/requisitos'}>Reequisitos</Link>
            {cookies.get('IdPerfil') == 1
              ? ''
              : <Link className="a2" to={'/a/tipoPerfil'}><Link href=""> Tipo Perfil</Link></Link>
            }
          </nav>
        </div>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            icons={tableIcons}
            columns={columns}
            data = {this.state.data}
          />
        </ThemeProvider>
        
        {/*---------- Modal Agregar----------------------- */}
        <AgregarVentanilla
                    isopen = {this.state.modalInsertar}
                    hideModal = {async () => await this.setState({modalInsertar: false})}
                    guardado = {async () => {await this.setState({modalInsertar: false});this.componentDidMount() }}
                    tipo = {agencia}
                />
      </div>
    )
  }
}