import { Router } from "express";
import { commentContent, getContentInteraction, likeContent, repostContent, shareContent } from "../controllers/interactions.js";
import { checkUserAuth } from "../middleware/auth.js";



export const interactionsRouter = Router()

interactionsRouter.post('/content/:contentId/like', checkUserAuth, likeContent)

interactionsRouter.post('/content/:contentId/comment', commentContent )

interactionsRouter.post('/content/:contentId/share', shareContent)

interactionsRouter.post("/content/:contentId/repost", repostContent)

interactionsRouter.get("/content/:contentId/interactions", getContentInteraction)