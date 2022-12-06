import React, { useEffect, useState } from 'react'
import { getAgenciaAll } from '../../services/apiAgencia'

export const ListaAgencia = ({ idA, nomA, handleGetAgencia }) => {

    const [data, setData] = useState([])

    const getAgencia = (val) => {
        handleGetAgencia(val)
    }

    const getAgenciaFetch = async () => {
        const res = await getAgenciaAll();
        setData(res.response)
    }
    useEffect(() => {
        getAgenciaFetch()
    }, [])

    return (
        <div className="col">
            {!idA ?
                <select className="form-select form-select-lg mb-3 mt-1" aria-label=".form-select-lg example" onChange={(e) => getAgencia(e.target.value)}>
                    <option value={""}>Agencia</option>
                    {data.map((v, i)=> (
                        <option key={i} value={v.idAgencia}>{v.nomAgencia}</option>
                    ))}
                </select>
                :
                <select className="form-select form-select-lg mb-3 mt-1" aria-label=".form-select-lg example" onChange={(e) => getAgencia(e.target.value)}>
                    <option value={idA}>{nomA}</option>
                    {data.map((v, i)=> (
                        <option key={i} value={v.idAgencia}>{v.nomAgencia}</option>
                    ))}
                </select>
            }
            
        </div>
    )
}
