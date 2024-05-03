import { User } from "../entities/Users";

export default interface IAppointmentDto {
    date: Date;
    time: string;
    userId: number;
    status: "active" | "cancelled"
}