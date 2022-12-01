import React, { useEffect, useState } from 'react'
import { peticionePerfilGet } from '../../services/apiTipoPerfil'

export const ListaCargo = ({ handleGetCargo}) => {
    
    const [data, setData] = useState([])

    const getCargo = (val) => {
        handleGetCargo(val) 
    }

    const getCargoFetch = async () => {
        const res = await peticionePerfilGet();
        setData(res.response)
    }
    useEffect(() => {
        getCargoFetch()
    },[])

    return (
        <div className="col">
            <select className="form-select form-select-lg mb-3 mt-1" aria-label=".form-select-lg example" onChange={(e) => getCargo(e.target.value)}>
                <option value={""}>Cargo</option>
                {data.map((v, i)=> (
                    <option key={i} value={v.idPerfil}>{v.nomTipoP}</option>
                ))}
            </select>
        </div>
    )
}
