import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import { createUserService, getAllUsersService, getUserByIdService, loginUserService } from "../services/usersService";
import { User } from "../entities/Users";

const getUsers = async (req: Request, res: Response) : Promise<void> => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}
const getUser = async (req: Request, res: Response) : Promise<void> => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(Number(id))
        res.status(200).json(user)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}

const registerUser = async (req: Request, res: Response)  => {
    const { name, email, birthDate, nDni, username, password} = req.body
    try {
        const newUser: User = await createUserService({ name, email, birthDate, nDni, username, password})
        res.status(201).json(newUser)
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}
const loginUser = async (req: Request, res: Response) : Promise<void> => {
    const { username, password} = req.body
    try {
        const user: User | null = await loginUserService({username, password})
        res.status(200).json({ login: true, user})
    } catch(error: any) {
        res.status(400).json({login: false, message: error.message})
    }
}

export { getUser, getUsers, registerUser, loginUser}