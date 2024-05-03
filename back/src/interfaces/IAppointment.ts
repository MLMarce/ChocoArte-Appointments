// export enum appointmentStatus {
//     ACTIVE = "active",
//     CANCELED = "canceled"
// }

export default interface IAppointment {
    id: number;
    date: string;
    time: string;
    userID: number;
    status: "active" | "cancelled"
}