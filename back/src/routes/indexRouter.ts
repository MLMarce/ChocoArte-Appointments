import { Router } from "express";
import userRouter from "./userRouter";
import appointmentRouter from "./appointmentRouter";

export const indexRouter = Router()

indexRouter.use('/users', userRouter)
indexRouter.use('/appointments', appointmentRouter)
