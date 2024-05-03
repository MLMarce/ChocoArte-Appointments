import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments";
import { Credential } from "../entities/Credentials";
import { User } from "../entities/Users";
import ICredentialDto from "../interfaces/ICredentialsDto";
import IUserDto from "../interfaces/IUserDto";
import { newCredentials, validateCredential } from "./credentialsService";




export const getAllUsersService = async () : Promise<User[]> => {
    const allUsers: User[] =  await AppDataSource.manager.find(User);
    return allUsers;
}  

export const getUserByIdService = async (id: number) : Promise<User | null > => {
    const foundUser: User | null =  await AppDataSource.manager.findOneBy(User, { id: id});

    if(!foundUser) throw Error('Usuario no encontrado')
    const foundAppointments: Appointment[] = await AppDataSource.manager.find(Appointment, {where: {userId: foundUser.id}})
    foundUser.appointments = foundAppointments
    return foundUser
} 


export const createUserService = async (createUserDto: IUserDto) : Promise<User> => {
    const newCredential: Credential = await newCredentials({username:createUserDto.username, password: createUserDto.password})

    const newUser = new User;
        newUser.name = createUserDto.name;
        newUser.email = createUserDto.email;
        newUser.birthDate = createUserDto.birthDate;
        newUser.nDni = createUserDto.nDni;
        newUser.credential = newCredential;

    const savedUser = await AppDataSource.manager.save(newUser);
    return savedUser;
}

export const loginUserService = async (validateCredentialsDto: ICredentialDto): Promise<User | null> => {
    const { username, password} = validateCredentialsDto;

    const foundCredential = await validateCredential({username, password})
    const foundUser = await AppDataSource.manager.findOneBy(User, { credential: foundCredential})


    return foundUser;
}

