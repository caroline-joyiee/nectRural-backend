import { Router } from "express";
import { commentContent, likeContent } from "../controllers/interactions.js";
import { checkUserAuth } from "../middleware/auth.js";



export const interactionsRouter = Router()

interactionsRouter.post('/content/:contentId/like', checkUserAuth, likeContent)

interactionsRouter.post('/content/:contentId/comment', commentContent )