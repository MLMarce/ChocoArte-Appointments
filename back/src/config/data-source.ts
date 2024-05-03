import { DataSource } from "typeorm";
import { User } from "../entities/Users";
import { Credential } from "../entities/Credentials";
import { Appointment } from "../entities/Appointments";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: Number(DB_PORT) || 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})