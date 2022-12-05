import React from 'react'

export const ColumnasVentanilla = () => {

    const columns = [
        {
            title: <b>N°</b>,
            render: rowData => rowData.tableData.id + 1 
          },{
            title: <h4>Nombre </h4>,
            field:'nomVentanilla'
          },
    ]
    return columns
}