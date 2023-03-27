"use client"

import styles from './vods.module.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];



export default function TablaVods({ vods, mapas, setMapa, cVods, setCVods } : any) {

    console.log(vods)

    return(<>
        <select className="form-select" onChange={(e) => setMapa(e.target.value)}>
                            <option value={'undefined'}>TODOS</option>
                            {mapas.map((mapa: any) => (
                                <option value={mapa.id} key={mapa.id}>{mapa.nombre}</option>
                            ))}
        </select>

        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />



        <table className="table table-dark">
            <thead>
                <tr className='text-center fw-bolder'>
                    <td className=''>MAPA</td>
                    <td className=''>LINK</td>
                    <td className=''>FECHA</td>
                </tr>
            </thead>
            {cVods ? <tbody className='text-center'><tr><td colSpan={3}>CARGANDO</td></tr></tbody> : <tbody>
                {vods?.map((vod:any) => (
                    <tr key={vod.id} className='text-center'>
                        <td className='col-3'>{mapas[vod.mapa-1]?.nombre}</td>
                        <td className=''>{vod.link}</td>
                        <td className='col-4'>{vod.fecha}</td>
                    </tr>
                ))}
            </tbody>}
        </table></>
    )
}