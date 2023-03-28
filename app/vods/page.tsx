"use client"

import { FormHTMLAttributes, useEffect, useRef, useState } from "react";
import TablaVods from "./TablaVods";
import styles from './vods.module.css'


export default function Vods() {

    const [vods, setVods] = useState([])
    const [mapa, setMapa] = useState('undefined')
    const [mapas, setMapas] = useState([{"id":1,"nombre":"Ascent"},{"id":2,"nombre":"Bind"},{"id":3,"nombre":"Haven"},{"id":4,"nombre":"Split"},{"id":5,"nombre":"Breeze"},{"id":6,"nombre":"Pearl"},{"id":7,"nombre":"Icebox"},{"id":8,"nombre":"Fracture"},{"id":9,"nombre":"Lotus"}])
    const [cVods, setCVods] = useState(true)

    async function getVods(mapa: any) {
        setCVods(true)
        const res = await fetch(`http://localhost:3000/api/getVods?mapa=${mapa}`);
        const vods = await res.json()
        setVods(vods)
        setCVods(false)
    }

    useEffect(() => {
        getVods(mapa)
    }, [mapa])

    const inputmapa = useRef('')
    const inputlink = useRef('')
    const inputfecha = useRef('')

    function handleSubmit(e: HTMLFormElement) {
        e.preventDefault()
        
        let mapaa = inputmapa.current.value
        let link = inputlink.current.value
        let fecha = inputfecha.current.value

        const data = {
            mapa: mapaa,
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
            getVods(mapa)
        }, 1000);
    }

    function handleDelete(id: number) {
        fetch('/api/getVods', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        })

        setTimeout(() => {
            getVods(mapa)
        }, 1000);
    }

    return(
        <div className="container ">
            <h2>VODS</h2>
            
            <div className="my-3 p-3 bg-primary rounded">
                <h3>Añadir una vod</h3>
                <form onSubmit={(e: any) => handleSubmit(e)}>
                    <div className="d-flex gap-2">
                        <select className="form-select" ref={inputmapa as any}>
                            {mapas.map(mapa => (
                                <option value={mapa.id} key={mapa.id}>{mapa.nombre}</option>
                            ))}
                        </select>
                        <input className="form-control" placeholder="Enlace de vod" type="text" ref={inputlink as any}/>
                        <input type="date" className="form-control" ref={inputfecha as any}/>
                        <button type="submit" className="btn btn-light">Añadir</button>
                    </div>
                </form>
            </div>

            <div className='rounded bg-dark p-3'><TablaVods vods={vods} mapas={mapas} mapa={mapa} setMapa={setMapa} cVods={cVods} handleDelete={handleDelete}></TablaVods></div>
        </div>
    )
}