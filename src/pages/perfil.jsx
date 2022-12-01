
import React, { useState, useEffect } from "react";
import '../styles/estiloAdminPerfil.css'
import Cookies from 'universal-cookie';  
import { tramiteUser } from '../services/apiUtTramite' 

const cookies = new Cookies();

// const ventanilla = cookies.get('idVentanilla');
// const cookieDenavventa =cookies.get('idVentanilla');
// const cookienomAg =cookies.get('nomAgencia');
// cookies.set('idVentanav',cookieDenavventa , {path: '/'});

export const Perfil = () => {
    const [tramites, setTramites] = useState([]);
    
	const handlePeticioneGetUtTByIdTram = async () =>  {
		const res = await tramiteUser(cookies.get('IdUsuario'));
		setTramites(res.response);	
	}

	useEffect( () => {
		handlePeticioneGetUtTByIdTram();
	}, [])

	const validarPerfil = () => {
		if(cookies.get('IdPerfil') == 3 || cookies.get('IdPerfil') == 2){
			return(
				<table className="table">
  					<thead>
    				<tr>
      					<th>Tramites</th>
    				</tr>
  					</thead>
  					<tbody>		
						{tramites?.map ((data, key) => {
							return(
								<tr key = {key}>
                                    
								    <th> {data.nomTramite} </th>
								</tr>
							)
						})}
  					</tbody>
				</table>
			)
		}
	}
	
	return(
		<>
		    <h1>Perfil de Usuario</h1>
			<div>
				<div className="container col-sm p-3 min-vh-100">
				  <div className="">
                    {cookies.get('IdAgencia') != 'null' &&
                        <h5 className="text-center">
                            Agencia <b><i>{cookies.get('nomAgencia')}</i></b>
                        </h5>
                    }
				    <h2 className="text-center">Perfil de <b><i>{cookies.get('NomUsuario')}</i></b></h2>
				    <div className="row">
				      <div className="col-6 foto">
				        <i className="bi bi-person-bounding-box"></i>
				      </div>
				      <div className="col-4">
				        <form>
				          <div className="mb-3">
					          <label htmlFor="exampleInputEmail1" className="form-label">Nombre Completo </label>
					          <input type="text" className="form-control" value={`${cookies.get('NomUsuario')} ${cookies.get('ApePaterno')} ${(cookies.get('ApeMaterno') == 'null' ? '' : cookies.get('ApeMaterno'))}`} readOnly />
				          </div>
				          <div className="mb-3">
					          <label htmlFor="exampleInputEmail1" className="form-label">C.I</label>
					          <input type="text" className="form-control" value={cookies.get('CiUsuario')} readOnly />
				          </div>
				          <div className="mb-3">
					          <label htmlFor="exampleInputEmail1" className="form-label">Nombre de Usuario</label>
					          <input type="text" className="form-control" value={cookies.get('UserName')} readOnly />
				          </div>
                          {cookies.get('nomPerfil') != 'null' &&
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Cargo</label>
                                <input type="text" className="form-control" value={cookies.get('nomPerfil')} readOnly />
                            </div>
                          }
						  <div className="mb-3 table-responsive">
							{validarPerfil()}
						  </div>
				        </form>
				      </div>
				    </div>
				  </div>
				 </div>
			</div>
			</>
		)
}