import React from 'react'

export const ColumnasTramites = () => {

    const columns = [
      {
        title: <b>N°</b>,
        render: rowData => rowData.tableData.id + 1
      },{
        title: <h4>NOMBRE</h4>,
        field: 'nomTramite',
      },
    ]
    return columns
}