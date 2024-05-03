import { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import style from './Login.module.css'
import { setIsLogged, setUser } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const urlUsers = 'http://localhost:3000/users';

export default function Login() {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value} = event.target
        console.log(userData)
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!Object.values(userData).length) return alert('Completa los campos')
        
        axios.post(`${urlUsers}/login`, userData)
        .then(response => response.data)
        .then((data) => {
            dispatch(setUser(data.user))
            dispatch(setIsLogged(data.login))
            navigate("/appointments")
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className={style.loginContainer}>
            <h2>Iniciar sesión</h2>
            <p className={style.loginMessage}>Inicia sesión para hacer tu reserva. Si no tienes una cuenta <Link to='/register'>regístrate</Link></p>
            <form className={style.formCointainer} onSubmit={handleSubmit}>
                <label>
                    <span>Nombre de usuario</span>
                    <input type="text" autoComplete='none' onChange={handleChange} value={userData.username} name='username' placeholder="pepito04"/>
                </label>
                <label>
                    <span>Contraseña</span>
                    <input type="password" autoComplete='none' onChange={handleChange} value={userData.password} name='password' placeholder="*******"/>
                </label>

                <input className={style.submitBtn} type="submit" disabled={Object.keys(userData).some(e => !userData[e])}  value="Login"/>
            </form>
        </div>
    )
}