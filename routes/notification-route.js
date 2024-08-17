 import { Router } from "express";
import { createNotification } from "../controllers/notification-control.js";

 export const notificationRouter = Router();

 notificationRouter.post('/notifications', createNotification)