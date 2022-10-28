import React from 'react'
import { Routes, Route} from "react-router-dom"
import { Login } from '../pages/login'
import Sidebar from '../components/navigation/sidebar'
import ProtectedRoutes from '../components/wrappers/protectedRoutes'
import { Admin } from '../pages/admin'


export const AppRoute = () => {
  return (
    <>
      <Routes>

        {/* Rutas Inicio Sesion Cargado */}
        <Route path='/a' element = {<Sidebar/>}>
          {/* Ruta Admin */}
          <Route path='/a' element={< ProtectedRoutes roleRequired = '1' />}>
            <Route path='/a/adminP' element={<Admin/>}/>
          </Route>
          
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
