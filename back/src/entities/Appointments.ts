import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./Users";

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    date: Date;
    @Column()
    time: string;
    @ManyToOne(() => User, (user) => user.appointments)
    user: User;
    @Column()
    status: "active" | "cancelled"
    @Column()
    userId: number
}