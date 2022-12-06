import React, {Component } from 'react'
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from "material-table";
import Cookies from 'universal-cookie';
import tableIcons from '../../assets/iconos/iconos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import '../../styles/estilosRequerimientos.css';

import { peticionGetRequisito } from '../../services/apiRequisitos';
import { resolveBreakpointValues } from '@mui/system/breakpoints';

const cookies = new Cookies();
const agencia = cookies.get('IdAgencia');
const estadoA = cookies.get('estadoA');

export class Requisitos extends Component {

  state = {
    data: [],
    modalInsertar: false,
    form: {
      idTramite: '',
      nomTramite: '',
      idRequisitos: '',
      nomRequisitos: '',
      estado: 1,
    }
  }

  handleGetRequisitos = async () => {
    const res = await peticionGetRequisito();
    this.setState({ data: res});
  }

  componentDidMount() {
    this.handleGetRequisitos();
  }
  render() {

    const defaultMaterialTheme = createTheme();

    const columns = [
      {
        title: <h4>N°</h4>,
        render: rowData => rowData.tableData.id + 1,
      }, {
        title: <h4>NOMBRE</h4>,
        field: 'nomRequisitos'
      }, {
        title: <h4>ESTADO</h4>,
        field: 'estado',
        type: 'numeric',
        render: (rowData) => (rowData.estado) ? <button className="btn btn-success" onClick={() => this.confirmacionActive(rowData.idRequisitos)}><i className="bi bi-check-square"></i></button> : <button className="btn btn-danger" onClick={() => this.confirmacionDesactive(rowData.idRequisitos)}><i className="bi bi-dash-square"></i></button>
      }, {
        title: <h4>EDITAR</h4>,
        render: (rowData) => <button className="btn btn-warning" onClick={() => { this.seleccionarRequisitos(rowData); this.modalInsertar(); this.peticioneGetUtTByIdRequi(rowData.idRequisitos) }}><FontAwesomeIcon icon={faEdit} /></button>
      }
    ]
    const { form } = this.state;

    return (
      <div className="container-fluid">

        <h1>Requisitos </h1>
        <div className="btnnavmulti">
          <button className="btn btn-success mb-2" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar</button>
          <nav className="navmulti">
            <Link className="a2 " to={"/a/ventanilla"}>Ventanillas </Link>
            <Link className="a2" to={'/a/multimedia'}>Multimedia</Link>
            <Link className="a2" to={'/a/tramite'}>Tramites</Link>
            <Link className="a2 activemulti" to={'/a/requisitos'}>Reequisitos</Link>
            {cookies.get('IdPerfil') == 1
              ? ''
              : <Link className="a2" to={'/a/tipoPerfil'}>Tipo Perfil</Link>
            }
          </nav>
        </div>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={this.state.data}
          />
        </ThemeProvider>
      </div>
    )
  }

}
