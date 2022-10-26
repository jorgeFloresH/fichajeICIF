import React from 'react'
import { Routes, Route} from "react-router-dom"
import { Login } from '../pages/login'
import Sidebar from '../components/navigation/sidebar'


export const AppRoute = () => {
  return (
    <>
      <Routes>

        {/* Rutas Inicio Sesion Cargado */}
        <Route path='/a' element = {<Sidebar/>}>
          {/* Ruta Admin */}
          <Route></Route>
          {/* Ruta Cajero */}
          <Route></Route>
          {/* Ruta Usuario */}
          <Route></Route>
        </Route>

        {/* -------------------------------------------------------------------------------------- */}

        {/* Ruta Login */}
        <Route>
          <Route path='/' element = {<Login/>}></Route>
        </Route>
      </Routes>
    </>
  )
}
