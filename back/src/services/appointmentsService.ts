import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments";
import IAppointmentDto from "../interfaces/IAppointmentDto";


export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    const allAppointments: Appointment[] = await AppDataSource.manager.find(Appointment)

    return allAppointments
}

export const getAppointmentByIdService = async (id: number) : Promise<Appointment | null > => {
    const foundAppointment: Appointment | null =  await AppDataSource.manager.findOneBy(Appointment, { id: id});

    if(!foundAppointment) throw Error('Turno no encontrado')
    return foundAppointment
} 

export const newAppointmentService = async (validateAppointmentDto: IAppointmentDto): Promise<Appointment> => {
    const newAppointment = new Appointment()
    newAppointment.date = validateAppointmentDto.date
    newAppointment.time = validateAppointmentDto.time
    newAppointment.status = validateAppointmentDto.status
    newAppointment.userId = validateAppointmentDto.userId

    const savedAppointment = AppDataSource.manager.save(newAppointment)
    return savedAppointment
}

export const cancelAppointmentService = async (id: number): Promise<Appointment> => {
    const appointmentToCancel: Appointment | null = await AppDataSource.manager.findOneBy(Appointment, { id: id});

    if(!appointmentToCancel) throw Error("Turno a cancelar no encontrado");
    if(appointmentToCancel.status === "cancelled") throw Error("El turno ya fue cancelado anteriormente")

    appointmentToCancel.status = "cancelled";

    const cancelledAppointment = await AppDataSource.manager.save(appointmentToCancel)

    return cancelledAppointment
}