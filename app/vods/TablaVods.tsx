"use client"

import styles from './vods.module.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Loading from '@/components/loading/Loading';


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



export default function TablaVods({ vods, mapas, setMapa, cVods, handleDelete } : any) {

    console.log(vods)

    return(<>
        <select className="form-select" onChange={(e) => setMapa(e.target.value)}>
                            <option value={'undefined'}>TODOS</option>
                            {mapas.map((mapa: any) => (
                                <option value={mapa.id} key={mapa.id}>{mapa.nombre}</option>
                            ))}
        </select>

        {cVods ? <div style={{textAlign: 'center', padding: '30px'}}><Loading></Loading></div> : <table className="table table-dark">
            <thead>
                <tr className='text-center fw-bolder'>
                    <td className=''>MAPA</td>
                    <td className=''>LINK</td>
                    <td className=''>FECHA</td>
                    <td className=''>ACCIONES</td>
                </tr>
            </thead>
            <tbody>
                {vods?.map((vod:any) => (
                    <tr key={vod.id} className='text-center'>
                        <td className='col-3'>{mapas[vod.mapa-1]?.nombre}</td>
                        <td className='col-xs-1'>{vod.link}</td>
                        <td className='col-4'>{vod.fecha}</td>
                        <td className='col-2'>
                            <button className='btn btn-danger' onClick={() => handleDelete(vod.id)}>🗑️</button>
                            <button className='btn btn-info'>✏️</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>}
        </>
    )
}