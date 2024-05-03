import { useEffect} from "react";
import Appointment from "../../components/Appointment/Appointment";
import style from './MyAppointments.module.css'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserAppointments } from "../../redux/userSlice";
import { Link } from "react-router-dom";

export default function MyAppointments() {
    const userID = useSelector(state => state.userStore.userData.id)
    console.log(userID)
    const userAppointments = useSelector(state => state.userStore.userAppointments)
    const dispatch = useDispatch()
    

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userID}`)
        .then(response => response.data)
        .then( usersData => {
                dispatch(setUserAppointments(usersData.appointments))
            })
        .catch((error) => console.log(error.message))
    }, [userID, dispatch])
    

    return (
        <div className={style.appointmentsContainer}>
            <h1>Mis Reservas</h1>
            <Link to='/createappointment' className={style.linkTo}>Crear Reserva</Link>
            <ul>
                { userAppointments.length 
                ? userAppointments?.map( ({id, date, time, status}) => {
                    return (
                        <Appointment key={id} id={id} date={date} time={time} status={status}/>
                    )
                } )
                : <span>Aún no hay turnos reservados...</span>
            }
            </ul>
        </div>
    )
}