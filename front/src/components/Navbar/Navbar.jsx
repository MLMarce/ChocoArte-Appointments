import { Link, NavLink } from 'react-router-dom'
import style from './Navbar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogged, setUser, setUserAppointments } from '../../redux/userSlice'
import { useState } from 'react'

export default function Navbar() {
    const [ulIsActive, setUlIsActive] = useState(false)
    const isLogged = useSelector(state => state.userStore.isLogged)
    const user = useSelector(state => state.userStore.userData)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        setUlIsActive(false)
        const confirm = window.confirm("Estas cerrando sesión...")

        if(!confirm) {
            return
        } else {
            dispatch(setIsLogged(false))
            dispatch(setUser({}))
            dispatch(setUserAppointments([]))
        }
    }

    const handleUlState = () => {
        setUlIsActive(!ulIsActive)
    }


    return (
        <nav className={style.nav}>
            <Link to='/' className={style.logo}></Link>
            <div className={ulIsActive ? style.ulActive : style.ulInactive}>
                <span className={style.menu} onClick={handleUlState}>{isLogged ? `${user.name}`: "Menu"}</span>
                <ul>
                    <NavLink className={({isActive}) => isActive ? 'active' : null}  to={'/'} onClick={() => {setUlIsActive(false)}}>Home</NavLink>
                    {isLogged === false ? <NavLink className={({isActive}) => isActive ? 'active' : null}  to={'/register'} onClick={() => {setUlIsActive(false)}}>Registrarse</NavLink>: null}
                    {isLogged ? <NavLink className={({isActive}) => isActive ? 'active' : null} to={'/appointments'} onClick={() => {setUlIsActive(false)}}>Mis Reservas</NavLink> : null}
                    {isLogged ? <NavLink className={({isActive}) =>  isActive ? 'active' : null} to={'/createappointment'} onClick={() => {setUlIsActive(false)}}>Reservar</NavLink> : null}
                    {isLogged 
                    ? <NavLink className={({isActive}) => isActive ? 'active' : null}  to={'/'} onClick={handleLogOut}>Cerrar Sesión</NavLink>
                    : <NavLink className={({isActive}) => isActive ? 'active' : null}  to={'/login'} onClick={() => {setUlIsActive(false)}}>Iniciar Sesión</NavLink>
                    }
                </ul>
            </div>
        </nav>
    )
}