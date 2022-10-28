import React from "react"
import {Navigate, Outlet} from "react-router-dom"
import Cookies from 'universal-cookie';

const useAuth = () => {
	const cookies = new Cookies();
	
    if(cookies.get('IdUsuario')) {
        return { 
            auth: true,
            role: cookies.get('IdPerfil')
        };
    }
    else{
        return {
            auth: false,
            role: null
        }
    }
}

const ProtectedRoutes = (roleRequired) => {
	const {auth, role} = useAuth()
	if (roleRequired) {
		return auth ? (roleRequired.roleRequired === role ? (<Outlet />) : console.log("No puede acceder a esta ruta")) 
		: 
		(<Navigate to="/" />)
	} else {
		return auth ? <Outlet /> : <Navigate to="/" />
	}
}

export default ProtectedRoutes
