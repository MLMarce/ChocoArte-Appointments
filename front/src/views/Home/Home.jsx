import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.avif'
import { useSelector } from 'react-redux'
import style from './Home.module.css'


export default function Home() {
    const isLogged = useSelector(state => state.userStore.isLogged)

    return(
        <div className={style.homeContainer}>
            <h1>¡Bienvenido a Choco Arte!</h1>
            <img src={logoImg} alt="logo choco arte" />
            <h2>¡La mejor cafetería de la región!</h2>

            <p>Este sitio te permitirá <Link to={isLogged ? '/createappointment': '/login'}>reservar</Link> una mesa en nuestra sucursal...</p>
        </div>
    )
}