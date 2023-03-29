import styles from './vods.module.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Loading from '@/components/loading/Loading';

export default function TablaVods({ vods, mapas, setMapa, cVods, handleDelete } : any) {

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
                    <td className=''>ACCIONEShttps://www.youtube.com/watch?v=bLlDwkOyI5c</td>
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