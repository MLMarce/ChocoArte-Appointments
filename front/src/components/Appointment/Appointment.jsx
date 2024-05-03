
import { useDispatch, useSelector } from 'react-redux'
import style from './Appointment.module.css'
import axios from 'axios'
import { setUserAppointments } from '../../redux/userSlice'


export default function Appointment({id, date, time, status}) {
    const dispatch = useDispatch()
    const userID = useSelector(state => state.userStore.userData.id)
    
    const changeStatus = () => {
        if(window.confirm(`Quieres cancelar el turno del dia ${date} a las ${time}hs?`)) {
            axios.put(`http://localhost:3000/appointments/cancel/${id}`)
            .then(() => {
                axios.get(`http://localhost:3000/users/${userID}`)
                .then(response => response.data)
                .then( usersData => {
                        dispatch(setUserAppointments(usersData.appointments))
                    })
                .catch((error) => console.log(error.message))
            })
            .catch(() => {
                alert("Error al cancelar reserva")
            })
        } else {
            return
        }
    }
    

    date = new Date(date)

    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    return (
        <li className={style.appointmentCard}>
            <h4 className={style.date}>Fecha: <span>{date}</span></h4>
            <h4 className={style.time}>Hora: <span>{time}hs</span></h4>
            <h4 className={style.status}>Estado: <span>{status === 'active' ? <span className={style.active} onClick={changeStatus}>{"Activo: (Cancelar)"}</span> : "Cancelado"}</span></h4>
        </li>
    )
}