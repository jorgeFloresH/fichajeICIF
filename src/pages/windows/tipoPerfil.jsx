import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import MaterialTable,{defaultMaterialTheme} from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import tableIcons from '../../assets/iconos/iconos';
import {Link} from 'react-router-dom'
import { peticionePerfilGet } from '../../services/apiTipoPerfil.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class TipoPerfil extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      idPerfil: '',
      nomTipoP: '',
      estado: 1,
      tipoModal: ''
    }
  }

  handlePeticionGetTipoPerfil = async () => {
    const res = await peticionePerfilGet();
    this.setState({ data: res.response });
  }

  componentDidMount() {
    this.handlePeticionGetTipoPerfil();
  }

  render() {

    const defaultMaterialTheme = createTheme();
    const { form } = this.state;
    const columns = [
      {
        title: <b>N°</b>,
        render: rowData => rowData.tableData.id + 1
      }, {
        title: <h4>NOMBRE</h4>,
        field: 'nomTipoP'
      }, {
        title: <h4>Estado</h4>,
        type: 'numeric',
        field: 'estado',
        render: (rowData) => rowData.estado == 1 ? <button className="btn btn-success" onClick={() => this.confirmacionActive(rowData.idPerfil)}><i className="bi bi-check-square"></i></button> : <button className="btn btn-danger" onClick={() => this.confirmacionDesactive(rowData.idPerfil)}><i className="bi bi-dash-square"></i></button>
      }, {
        title: <h4>Acciones</h4>,
        render: (rowData) => <button className="btn btn-primary" onClick={() => { this.seleccionarTipoPerfil(rowData); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
      }]
    return (
      <div className="container-fluid">
        <h1 className="text-center">Tipo Perfil </h1>

        <div className="btnnavmulti">
          <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar</button>
          <nav className="navmulti">
            <Link className="a2" to={'/a/ventanilla'}>Ventanillas </Link>
            <Link className="a2" to={'/a/multimedia'}>Multimedia</Link>
            <Link className="a2" to={'/a/tramite'}>Tramites</Link>
            <Link className="a2" to={'/a/requisitos'}>Reequisitos</Link>
            {cookies.get('IdPerfil') == 1
              ? ''
              : <Link className="a2 activemulti" to={'/a/tipoPerfil'}>Tipo Perfil</Link>
            }
          </nav>
        </div>
        <div className="mt-3">
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={this.state.data}
            />
          </ThemeProvider>
        </div>
      </div>
    )
  }
}
