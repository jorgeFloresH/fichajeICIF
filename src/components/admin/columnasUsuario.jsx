import React from 'react'


export const ColumnasUsuario = () => {

    const columns = [
        {
            title: <b>N°</b>,
            render: rowData => rowData.tableData.id + 1 
        },{
            title:<h4>NOMBRE COMPLETO</h4>,
            field:'nomUsuario',
            render:(rowData)=> rowData.nomUsuario +" "+rowData.apePaterno+" "+ rowData.apeMaterno
        },{
            title:<h4>C.I.</h4>,
            field:'ciUsuario',
            type:'numeric'
        },{
            title:<h4>NOMBRE DE USUARIO</h4>,
            field:'userName',
        },{
            title:<h4>CARGO</h4>,
            field:'nomTipoP',
        }
    ]
    return columns
}