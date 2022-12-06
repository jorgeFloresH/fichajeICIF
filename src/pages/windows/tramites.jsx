import axios from 'axios';
import React, { Component } from 'react';
import MaterialTable,{defaultMaterialTheme} from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import tableIcons from '../../assets/iconos/iconos';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../../styles/estilosTramites.css'
import { ColumnasTramites } from '../../components/windows/tramites/columnasTramites.jsx';
import { peticionGet, getTramiteAgen} from '../../services/apiTramite';

const cookies = new Cookies();
const agencia = cookies.get('IdAgencia');

export class Tramites extends Component {
  state = {
    Agencias:[],
    data: [],
    modalInsertar: false,
    form: {
      idAgencia: '',
      idRequisitos: '',
      nomRequisitos: '',
      idRequitram: '',
      idTramite: '',
      nomTramite: '',
      estado: 1,
    }
  }
  handleGetTramiteAdmin = async () => {
    const res = await peticionGet();
    this.setState({ data: res.response });
  }

  handlePeticionGetTramiteSuperAdmin = async() => {
    const res = await getTramiteAgen(agencia);
    this.setState({ data: res.response });
  }

  componentDidMount() {
    if (cookies.get('IdAgencia') != 'null'){
      this.handleGetTramiteAdmin();
    }
    else{
        this.handlePeticionGetTramiteSuperAdmin()
    }
  }

  render(){
    const defaultMaterialTheme = createTheme();
    let columns
     const c = [
  	  {
        title:<h4>REQUISITOS</h4>,
        render:(rowData)=><button className="btn btn-primary" onClick={() => { this.modalVer(); this.handlePeticioneGetUtTByIdTram(rowData.idTramite) }}>Requisitos</button>
      },{
        title:<h4>ESTADO</h4>,
        field:'estado',
        render:(rowData)=>(rowData.estado) ? <button className="btn btn-success" onClick={()=>this.confirmacionActive(rowData.idTramite)}><i class="bi bi-check-square"></i></button> : <button className="btn btn-danger" onClick={()=>this.confirmacionDesactive(rowData.idTramite)}><i class="bi bi-dash-square"></i></button>
      },{
        title:<h4>EDITAR</h4>,
        render:(rowData)=><button className='btn btn-warning' onClick={()=>{this.seleccionarTramite(rowData);this.modalInsertar()}}><i class="bi bi-pencil-square"></i></button>
      }
    ]

    //Super Administrador
    if (cookies.get('IdAgencia') == 'null'){
      const d = [
        {
          title:<h4>AGENCIA</h4>,
          render:(rowData)=><b>{rowData.nomAgencia}</b>
        }
      ]
      columns = ColumnasTramites().concat(c, d)
  }

    return (
      <div className='container-fluid'>
        <h1>Tramites </h1>

        <div className="btnnavmulti">
          <button className='btn btn-success' onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); this.setState({ SelectedOptionR: [] }); this.setState({ SelectedOption: [] }) }}>Agregar</button>
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
            data={this.state.data}
            title={<h3><i> </i></h3>}
          />
        </ThemeProvider>
      </div>
    )
  }
}
