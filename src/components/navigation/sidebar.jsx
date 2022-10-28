import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {useNavigate, Link} from "react-router-dom";
import { CerrarSesion } from '../global/alertaCerrar';
import { Outlet } from 'react-router-dom';
import '../../styles/estiloSidebar.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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

    return(
      <div className='App'>
        <div className="nav" id="nav">
          <>
            <ul >
              {(cookies.get('IdPerfil') == 1 || cookies.get('IdAgencia') == 'null') &&
                <li className="list activo">
                  <Link to="/a">
                    <span className="icon"><i className="bi bi-house-door-fill"></i></span>
                    <span className="text">Inicio</span>
                  </Link>
                </li>
              }
              {cookies.get('IdAgencia') == 'null' &&
                <li className="list">
                  <Link to="/a">
                    <span className="icon"><i className="bi bi-house-door-fill"></i></span>
                    <span className="text">Agencia</span>
                  </Link>
                </li>
              }
              <li className="list ">
                <Link to="/a">
                  <span className="icon"><i className="bi bi-person-workspace"></i></span>
                  <span className="text">Perfil</span>
                </Link>
              </li >
              {(cookies.get('IdPerfil') == 1 || cookies.get('IdAgencia') == 'null') &&
                <>
                  <li className="list ">
                    <Link to="/a">
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
                <Link to="/a">
                  <span className="icon"><i className="bi bi-ticket-detailed-fill"></i></span>
                  <span className="text">Ticket</span>
                </Link>
              </li >
              <li className="list">
                  <a onClick={ async () => await CerrarSesion() ? usenavigate('/'):console.log("Cancelado Cerrar Sesion")}>
                    <span className="icon"><i className="bi bi-box-arrow-left"></i></span>
                    <span className="text">Cerrar</span>
                  </a>
              </li >
              <div className="indicardor"></div>
            </ul>
          </>
        </div>
        <div className="div">
          <h1>Bienvenido {cookies.get('UserName')}</h1>
          <h2>Tipo de usuario: {cookies.get('nomPerfil')}</h2>
          <h2>Ventanilla: {cookies.get('Nomventanilla')}</h2>
          <Outlet/>
        </div>
      </div>
    )
}

export default Sidebar;