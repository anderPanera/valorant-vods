import { supabase } from '../../lib/supabaseClient'

export const revalidate = 0

async function getMapas() {
    let {data, error} = await supabase.from('Mapas').select('id,nombre')
    return data
}

export default async function Mapas() {

    const data = await getMapas()

    return(
        <div>{data?.map(mapa => (
            <span key={mapa.id}>{mapa.nombre}</span>
        ))}</div>
    )
}