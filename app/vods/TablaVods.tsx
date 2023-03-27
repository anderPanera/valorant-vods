export default function TablaVods({ vods, mapas } : any) {
    return(
        <table>
            <thead>
                <tr>
                    <td>MAPA</td>
                    <td>LINK</td>
                    <td>FECHA</td>
                </tr>
            </thead>
            <tbody>
                {vods?.map((vod:any) => (
                    <tr key={vod.id}>
                        <td>{mapas[vod.mapa-1]?.nombre}</td>
                        <td>{vod.link}</td>
                        <td>{vod.fecha}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}