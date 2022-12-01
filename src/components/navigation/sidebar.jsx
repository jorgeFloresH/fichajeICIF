import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {useNavigate, Link} from "react-router-dom";
import { CerrarSesion } from '../global/alertaCerrar';
import { Outlet } from 'react-router-dom';
import '../../styles/estiloSidebar.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { estadoVentanilla } from '../../services/apiVentanilla';

const Sidebar = () => {

    const cookies = new Cookies();
    const usenavigate = useNavigate();

    useEffect (() => {
      if(!cookies.get('UserName')){
			  usenavigate('/')
		  }
      nav()
    }, [])

    const nav=()=>{
      const list = document.querySelectorAll('.list');
      function activeLink() {
        list.forEach((item) => 
        item.classList.remove('activo'));
        this.classList.add('activo');
      }
      list.forEach((item)=>item.addEventListener('click',activeLink));
    }

    const BorrarCookie = async () =>{
      if (cookies.get('IdPerfil') == 3 || cookies.get('IdPerfil') == 4)
      {
        await estadoVentanilla(cookies.get('Idventanilla'), 1)
      }
      cookies.remove('IdUsuario', {path: '/'});
      cookies.remove('UserName', {path: '/'});
      cookies.remove('UserPassword', {path: '/'});
      cookies.remove('IdPerfil', {path: '/'});
      cookies.remove('FechaCreacion', {path: '/'});
      cookies.remove('IdAgencia', {path: '/'});
      cookies.remove('Esatado', {path: '/'});
      cookies.remove('NomUsuario', {path: '/'});
      cookies.remove('ApePaterno', {path: '/'});
      cookies.remove('ApeMaterno', {path: '/'});
      cookies.remove('CiUsuario', {path: '/'});
      cookies.remove('estadoA', {path: '/'});
      cookies.remove('nomPerfil', {path: '/'});
      cookies.remove('nomAgencia', {path: '/'});
      cookies.remove('Idventanilla', {path: '/'});
      cookies.remove('Nomventanilla', {path: '/'});
      usenavigate('/')
    }

    return(
      <div className='App'>
        <div className="nav" id="nav">
          <>
            <ul >
              {(cookies.get('IdPerfil') == 1 || cookies.get('IdAgencia') == 'null') &&
                <li className="list activo">
                  <Link to="/a/adminP">
                    <span className="icon"><i className="bi bi-house-door-fill"></i></span>
                    <span className="text">Inicio</span>
                  </Link>
                </li>
              }
              {cookies.get('IdAgencia') == 'null' &&
                <li className="list">
                  <Link to="/a/agencia">
                    <span className="icon"><i className="bi bi-building"></i></span>
                    <span className="text">Agencia</span>
                  </Link>
                </li>
              }
              
              <li className={(cookies.get('IdPerfil') == 1 || cookies.get('IdAgencia') == 'null')? 'list':'list activo'}>
                <Link to="/a/perfil">
                  <span className="icon"><i className="bi bi-person-workspace"></i></span>
                  <span className="text">Perfil</span>
                </Link>
              </li >

              {(cookies.get('IdPerfil') == 1 || cookies.get('IdAgencia') == 'null') &&
                <>
                  <li className="list ">
                    <Link to="/a/usuario">
                      <span className="icon"><i className="bi bi-person-fill"></i></span>
                      <span className="text">Usuarios</span>
                    </Link>
                  </li >
                  
                  <li className="list">
                    <Link to="/a">
                      <span className="icon"><i className="bi bi-gear-fill"></i></span>
                      <span className="text">config</span>
                    </Link>
                  </li >
                </>
              }
              <li className="list ">
                <Link to="/a" >
                  <span className="icon"><i className="bi bi-ticket-detailed-fill"></i></span>
                  <span className="text">Ticket</span>
                </Link>
              </li >
              <li className="list">
                  <a onClick={ async () => await CerrarSesion('SEGURO QUE QUIERE CERRAR SESION?', 'CERRAR SESION', 'warning', true, '#3085d6', '#d33', 'Cancelar', 'Si, Quiero Salir!') 
                    ? BorrarCookie():console.log("Cancelado Cerrar Sesion")}
                  >
                    <span className="icon"><i className="bi bi-box-arrow-left"></i></span>
                    <span className="text">Cerrar</span>
                  </a>
              </li >
              <div className="indicardor"></div>
            </ul>
          </>
        </div>
        <div className="div">
          <Outlet/>
        </div>
      </div>
    )
}

export default Sidebar;