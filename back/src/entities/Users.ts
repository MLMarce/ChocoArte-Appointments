import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credentials"
import { Appointment } from "./Appointments"

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column({length: 100})
    name: string
    @Column()
    email: string
    @Column()
    birthDate: string
    @Column()
    nDni: number
    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential
    @OneToMany(() => Appointment, (appoinment) => appoinment.user)
    appointments: Appointment[] 
}