import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentials";
import ICredentialDto from "../interfaces/ICredentialsDto";



export async function newCredentials(newCredentialDto: ICredentialDto) : Promise<Credential> {
    const newCredential = new Credential();
    newCredential.username = newCredentialDto.username
    newCredential.password = newCredentialDto.password

    const savedCredential = await AppDataSource.manager.save(newCredential);

    return savedCredential;
}


export async function validateCredential(validateCredentialDto: ICredentialDto) : Promise<Credential> {
    const {username, password} = validateCredentialDto;
    const foundCredential = await AppDataSource.manager.findOneBy(Credential, {username})
    if(!foundCredential) throw Error('Usuario no encontrado');
    if(password !== foundCredential?.password) throw Error('Contraseña incorrecta');

    return foundCredential;
}