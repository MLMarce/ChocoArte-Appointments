import { Request, Response } from "express";
import { Appointment } from "../entities/Appointments";
import { cancelAppointmentService, getAllAppointmentsService, getAppointmentByIdService, newAppointmentService } from "../services/appointmentsService";

const getAllAppointments = async (req: Request, res: Response) : Promise<void> => {
    try {
        const allAppointments: Appointment[] = await getAllAppointmentsService()
        res.status(200).json(allAppointments)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}
const getAppointment = async (req: Request, res: Response) : Promise<void> => {
    const { id } = req.params;
    try {
        const appointment = await getAppointmentByIdService(Number(id))
        res.status(200).json(appointment)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}

const newAppointment = async (req: Request, res: Response) : Promise<void> => {
    const {date, time, userId, status} = req.body;
    try {
        const newAppointment: Appointment = await newAppointmentService({date, time, userId, status})
        res.status(201).json(newAppointment)
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}
const cancelAppointment = async (req: Request, res: Response) : Promise<void> => {
    const { appId } = req.params
    try {
        const cancelledAppointment: Appointment = await cancelAppointmentService(Number(appId))
        res.status(200).json({message:"Turno cancelado correctamente", cancelledAppointment})
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}

export { getAllAppointments, getAppointment, newAppointment, cancelAppointment}