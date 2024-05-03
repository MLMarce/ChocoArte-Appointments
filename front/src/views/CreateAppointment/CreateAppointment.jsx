import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validateAppointmentForm } from '../../helpers/validateAppointmentForm'
import style from './CreateAppointment.module.css'
import { useState } from 'react'
import axios from 'axios'
import { setUserAppointments } from '../../redux/userSlice'


export const CreateAppointment = () => {
    let actualDate = new Date().toISOString().split("T")[0];
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        time: ''
    })
    const [errors, setErrors] = useState({})
    const userId = useSelector(state => state.userStore.userData.id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value} = event.target
        setAppointmentData({...appointmentData, [name]: value})
        setErrors(validateAppointmentForm({...appointmentData, [name]: value}))
        console.log({...appointmentData, [name]: value})
        console.log(errors)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(Object.keys(errors).length) return alert(Object.values(errors))

        const newAppointment = {
            ...appointmentData,
            userId,
            status: "active"
        }

        axios.post("http://localhost:3000/appointments/schedule", newAppointment)
        .then(() => {
            alert("Reservado con éxito!")
            axios.get(`http://localhost:3000/users/${userId}`)
            .then(({data}) => {
                dispatch(setUserAppointments(data.appointments))
                navigate('/appointments')
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }

    return (
        <div className={style.createContainer}>
            <h2>Haz tu reserva</h2>
            <form className={style.formCointainer} onSubmit={handleSubmit}>
                {Object.keys(errors).length ? <span style={{color: "red"}}>{Object.values(errors)}</span> : null}
                <label>
                    <span>Fecha</span>
                    <input type="date" autoComplete='none' min={actualDate} onChange={handleChange} value={appointmentData.date} name='date' placeholder="12/04/2024"/>
                </label>
                <label>
                    <span>Hora</span>
                    <input type="time" autoComplete='none' onChange={handleChange} value={appointmentData.time} name='time' placeholder="11:00"/>
                </label>

                <input className={style.submitBtn} type="submit" disabled={Object.keys(errors).some(e => errors[e]) || Object.keys(appointmentData).some(e => appointmentData[e] == '')}  value="Reservar"/>
            </form>
        </div>
    )

}