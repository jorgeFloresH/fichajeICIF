import React from 'react'
import { Routes, Route} from "react-router-dom"
import { Login } from '../pages/login'
import Sidebar from '../components/navigation/sidebar'
import ProtectedRoutes from '../components/wrappers/protectedRoutes'
import { Admin } from '../pages/admin/admin'
import { Perfil } from '../pages/perfil' 
import Agencia from '../pages/admin/agencia'
import Usuario from '../pages/admin/usuario'
import { Multimedia } from '../pages/windows/multimedia'
import { Requisitos } from '../pages/windows/requisitos'
import { Tramites } from '../pages/windows/tramites'
import { Ventanilla } from '../pages/windows/ventanilla'
import { TipoPerfil } from '../pages/windows/tipoPerfil'

export const AppRoute = () => {
  return (
    <>
      <Routes>
        {/* Rutas Inicio Sesion Cargado */}
        <Route path='/a' element = {<Sidebar/>}>
          
          {/* Ruta Admin */}
          <Route path='/a' element={< ProtectedRoutes roleRequired = {['1']} />}>
            <Route path='/a/adminP' element={ <Admin/> }/>

          </Route>
          
          {/* Ruta SuperAdmin */}
          <Route path='/a' element={< ProtectedRoutes roleRequired = {['null']} />}>
            <Route path='/a/agencia' element={ <Agencia/> }/>
            <Route path='/a/tipoPerfil' element={ <TipoPerfil/> }/>
          </Route>

          {/* Ruta Admin y Super-Admin */}
          <Route path='/a' element={< ProtectedRoutes roleRequired = {['null', '1']} />}>
            <Route path='/a/usuario' element={ <Usuario/> }/>
            <Route path='/a/ventanilla' element={ <Ventanilla/> }/>
            <Route path='/a/multimedia' element={ <Multimedia/> }/>
            <Route path='/a/tramite' element={ <Tramites/> }/>
            <Route path='/a/requisitos' element={ <Requisitos/> }/>
          </Route>

          {/* Rutas Global (Usuario-Cajas) */}
          <Route path='/a/tipoPerfil' element={<Perfil/>}/>
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
