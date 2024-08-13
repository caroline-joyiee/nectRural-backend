import { Router } from "express";
import { getAllUsers, getUser, logIn, logout, signUp } from "../controllers/user-modelController.js";
import { checkUserAuth } from "../middleware/auth.js";


export const userRouter = Router();

userRouter.post('/user/auth/signUp', signUp);

userRouter.post('/user/auth/logIn', logIn);

userRouter.get('/user/auth/signUp', getUser);

userRouter.get('/user/auth/:userName', getAllUsers);

userRouter.post('/user/auth/logout', checkUserAuth, logout)
