import Link from 'next/link'
import styles from './Navbar.module.css'

const routes = [
    { route: '/inicio', label: 'Inicio'},
    { route: '/mapas', label: 'Mapas'},
    { route: '/vods', label: 'Vods'}
]

export default function Navbar() {
    return(
        <div className={styles.navbar}>
            <Link href={'/'}>APP</Link>
            {routes.map(route => (
            <Link href={route.route} key={route.route}>{route.label}</Link>
            ))}
        </div>
    )
}