"use client"

import { useEffect, useRef, useState } from "react";
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

    const [inputMapa, setInputMapa] = useState('1')
    const [inputLink, setInputLink] = useState('')
    const [inputFecha, setInputFecha] = useState('')

    function handleSubmit(e: HTMLFormElement) {
        e.preventDefault()

        const data = {
            mapa: inputMapa,
            link: inputLink,
            fecha: inputFecha
        }
    
        fetch('/api/getVods', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        })

        getVods(mapa)

    }

    function handleDelete(id: number) {
        fetch('/api/getVods', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        })

        getVods(mapa)
    }

    return(
        <div className="container ">
            <h2>VODS</h2>
            
            <div className="my-3 p-3 bg-primary rounded">
                <h3>Añadir una vod</h3>
                <form onSubmit={(e: any) => handleSubmit(e)}>
                    <div className="d-flex gap-2">
                        <select className="form-select" onChange={(e) => setInputMapa(e.target.value)}>
                            {mapas.map(mapa => (
                                <option value={mapa.id} key={mapa.id}>{mapa.nombre}</option>
                            ))}
                        </select>
                        <input className="form-control" placeholder="Enlace de vod" type="text" onChange={(e) => setInputLink(e.target.value)}/>
                        <input type="date" className="form-control" onChange={(e) => setInputFecha(e.target.value)}/>
                        <button type="submit" className="btn btn-light">Añadir</button>
                    </div>
                </form>
            </div>

            <div className='rounded bg-dark p-3'><TablaVods vods={vods} mapas={mapas} mapa={mapa} setMapa={setMapa} cVods={cVods} handleDelete={handleDelete}></TablaVods></div>
        </div>
    )
}