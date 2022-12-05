import React, { useEffect, useState } from 'react'
import { getTramiteAgen } from '../../services/apiTramite'
import Select from 'react-select';
import Cookies from 'universal-cookie';

export const ListaTramites = ({ handleGetTramites }) => {
    const cookies = new Cookies();
    const [data, setData] = useState([])

    const getTramite = SelectedOption => {
        handleGetTramites(SelectedOption) 
    }

    const getTramiteFetch = async () => {
        const resp = await getTramiteAgen(cookies.get('IdAgencia'));        
        const res = resp.response.filter((item) => item.estado != 0);
        const op = res.map(
            r => 
            (
                {
                    "value": r.idTramite,
                    "label": r.nomTramite
                }
            )
        )
        setData(op);      
    }
    useEffect(() => {
        getTramiteFetch()
    },[])

    return (
        <div>
            <Select isMulti options={data} onChange={getTramite} closeMenuOnSelect={false} />
        </div>
    )
}
