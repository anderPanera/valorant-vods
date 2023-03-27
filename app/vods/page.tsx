"use client"

import { FormHTMLAttributes, useEffect, useRef, useState } from "react";
import TablaVods from "./TablaVods";



export default function Vods() {

    const [vods, setVods] = useState([])
    const [mapa, setMapa] = useState('undefined')
    const [mapas, setMapas] = useState([{id: 0, nombre: ''}])

    

    async function getMapas() {
        const res = await fetch(`http://localhost:3000/api/getMapas`)
        const data = await res.json()
        setMapas(data)
    }

    async function getVods(mapa: any) {
        const res = await fetch(`http://localhost:3000/api/getVods?mapa=${mapa}`);
        const vods = await res.json()
        setVods(vods)
    }

    useEffect(() => {
        getVods(mapa)
        getMapas()
    }, [mapa])


    const inputmapa = useRef('')
    const inputlink = useRef('')
    const inputfecha = useRef('')

    function handleSubmit(e: HTMLFormElement) {
        e.preventDefault()
        
        
        let mapa = inputmapa.current.value
        let link = inputlink.current.value
        let fecha = inputfecha.current.value

        const data = {
            mapa: mapa,
            link: link,
            fecha: fecha
        }
    
        fetch('/api/getVods', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        })

        setTimeout(() => {
            getVods('undefined')
        }, 1000);
    }
    

    return(
        <div>
            <h2>COMPONENTE VODS</h2>
            <select onChange={(e) => setMapa(e.target.value)}>
                {mapas.map(mapa => (
                    <option value={mapa.id} key={mapa.id}>{mapa.nombre}</option>
                ))}
            </select>
            <TablaVods vods={vods} mapas={mapas}></TablaVods>
            <form onSubmit={(e: any) => handleSubmit(e)}>
                <input id="mapa" ref={inputmapa as any}></input>
                <input id="link" ref={inputlink as any}></input>
                <input id="fecha" type={'date'} ref={inputfecha as any}></input>
                <button>Añadir vod</button>
            </form>
        </div>
    )
}