import React, {Component } from 'react'
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from "material-table";
import Cookies from 'universal-cookie';
import '../../styles/estiloWindows.css';
import tableIcons from '../../assets/iconos/iconos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { peticionGetIdAge } from '../../services/apiVentanilla';

const defaultMaterialTheme = createTheme();
const cookies = new Cookies();
const agencia = cookies.get('IdAgencia');
const estadoA = cookies.get('estadoA');

export class Ventanilla extends Component {
  state = {
    data:[],
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

  componentDidMount() {
    this.handleGetVentanillaIdAg();
  }

  render() {
    const columns = [
      {
        title: <b>N°</b>,
        render: rowData => rowData.tableData.id + 1 
      },{
        title: <h4>Nombre </h4>,
        field:'nomVentanilla'
      },{
        title: <h4>✔/✖</h4>,
        field:'estadoV',
        render:(rowData)=>(rowData.estadoV) ? <button className="btn btn-success" onClick={() => this.confirmacionActive(rowData.idVentanilla)}><i className="bi bi-check-square"></i></button> : <button className="btn btn-danger" onClick={() => this.confirmacionDesactive(rowData.idVentanilla)}><i className="bi bi-dash-square"></i></button>
      }
      ,{
        title: <h4>En Uso</h4>,
        field:'estadoV',
        render:(rowData)=>(rowData.estadoV == 3) ? <button className="btn btn-info" onClick={() => this.confirmacionDesactive(rowData.idVentanilla)}><i className="bi bi-check-all"></i></button> : <button className="btn btn-dark"><i className="bi bi-x"></i></button>
      },{
        title:<h4>EDITAR</h4>,
        render:(rowData)=><button className="btn btn-warning" onClick={() => { this.seleccionarVentanilla(rowData); this.modalInsertar(); this.handlePeticioneGetUtTByIdUser(rowData.idVentanilla)}}><FontAwesomeIcon icon={faEdit} /></button>
      }
    ]
    const columns2 = [
      {
        title: <b>N°</b>,
        render: rowData => rowData.tableData.id + 1 
      },{
        title: <h4>Nombre</h4>,
        field:'nomVentanilla'
      },{
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
      },{
        title:<h4>Tramites</h4>,
        render:(rowData)=><button type="button" className="btn btn-primary" data-bs-toggle="modal" onClick={() => this.handlePeticioneGetUtTByIdUser(rowData.idVentanilla)} data-bs-target="#exampleModal">
                  Tramites
                </button>
      }
    ]
    return (
      <div className="container-fluid mt-2">
        <h1>Ventanilla </h1>
        <br />
        <div className="btnnavmulti">
          <button className="btn btn-success" >Agregar</button>
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
            columns={estadoA == 1 ? columns : columns2}
            data = {this.state.data}
          />
        </ThemeProvider>
      </div>
    )
  }
}