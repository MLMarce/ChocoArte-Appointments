import { Router } from "express";
import { getUser, getUsers, registerUser, loginUser} from '../controllers/userControllers'

const userRouter = Router();

userRouter.get('/', getUsers)

userRouter.get('/:id', getUser)

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

export default userRouter;