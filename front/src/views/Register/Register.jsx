import { useState } from 'react'
import style from './Register.module.css'
import validateData from '../../helpers/validateData'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const urlUsers = 'http://localhost:3000/users';


export default function Register() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        birthDate: '',
        nDni: '',
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    let actualDate = new Date().toISOString().split("T")[0];

    const handleChange = (event) => {
        const { name, value} = event.target
        console.log(userData)
        setUserData({...userData, [name]: value})
        setErrors(validateData({...userData, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(Object.keys(errors).length) return alert('Errores en los campos')
        
        axios.post(`${urlUsers}/register`, userData)
        .then(response => response.data)
        .then(() => {
            alert("Registrado correctamente")
            setUserData({name: '', email: '', birthDate: '', nDni: '', username: '', password: '', confirmPassword: ''})
            navigate('/login')
        })
        .catch(error => alert(error?.response?.data?.message))

    }
    // useEffect(() => {

    // }, [])
    return (
        <div className={style.registerContainer}>
            <h2>Registrate Gratis</h2>
            <p className={style.error}>{Object.values(errors) ? Object.values(errors) : ""}</p>
            <form className={style.formCointainer} onSubmit={handleSubmit}>
                <label>
                    <span>Nombre</span>
                    <input type="text" autoComplete='none' onChange={handleChange} value={userData.name} name='name' placeholder="Pepe Lopez"/>
                </label>
                <label>
                    <span>Correo electrónico</span>
                    <input type="email" autoComplete='none' onChange={handleChange} value={userData.email} name='email'  placeholder="pepito@example.com"/>
                </label>
                <label>
                    <span>Fecha de Nacimiento</span>
                    <input type="date" autoComplete='none' max={actualDate} onChange={handleChange} value={userData.birthDate} name='birthDate' />
                </label>
                <label>
                    <span>DNI</span>
                    <input type="text" autoComplete='none' onChange={handleChange} value={userData.nDni} name='nDni' placeholder="12345678"/>
                </label>
                <label>
                    <span>Nombre de usuario</span>
                    <input type="text" autoComplete='none' onChange={handleChange} value={userData.username} name='username' placeholder="pepito04"/>
                </label>
                <label>
                    <span>Contraseña</span>
                    <input type="password" autoComplete='none' onChange={handleChange} value={userData.password} name='password' placeholder="*******"/>
                </label>
                
                <label>
                    <span>Confirmar contraseña</span>
                    <input type="password" autoComplete='none' onChange={handleChange} value={userData.confirmPassword} name='confirmPassword' placeholder="*******"/>
                </label>

                <input className={style.submitBtn} type="submit" disabled={Object.keys(errors).some(e => errors[e]) || !Object.values(userData).some(e => e)} value="Registrarse"/>
            </form>
        </div>
    )
}