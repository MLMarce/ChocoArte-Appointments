import style from './ErrorPage.module.css'
import logoImg from '../../assets/logo.avif'
import { Link } from 'react-router-dom'



export default function ErrorPage() {
    return(
        <div className={style.errorContainer}>
            <h1>404</h1>
            <img src={logoImg} alt="logo choco arte" />
            <h2>No hay nada aqui {':('}</h2>

            <p>Puedes dirigirte a <Link to='/'>Nuestro Home</Link> </p>
        </div>
    )
} 