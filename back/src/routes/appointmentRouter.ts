import { Router } from "express";
import { getAllAppointments, getAppointment, newAppointment, cancelAppointment} from '../controllers/appontmentController'

const appointmentRouter = Router();

appointmentRouter.get('/', getAllAppointments)

appointmentRouter.get('/:appId', getAppointment)

appointmentRouter.post('/schedule', newAppointment)

appointmentRouter.put('/cancel/:appId', cancelAppointment)

export default appointmentRouter