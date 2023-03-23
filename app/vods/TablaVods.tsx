export default function TablaVods({ vods, mapas} : any) {
    return(
        <table>
            <thead>
                <tr>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {vods?.map((vod:any) => (
                    <tr key={vod.id}>
                        <td>{mapas[vod.mapa-1]?.nombre}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}