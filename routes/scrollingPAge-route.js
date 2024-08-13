import { Router } from "express";
import { deleteIssue, getIssues, postIssues, updateIssues } from "../controllers/scrolling-page.js";
import { upload } from "../middleware/upload.js";
import { checkUserAuth } from "../middleware/auth.js";

export const scrollingRouter = new Router()

scrollingRouter.post('/user/scroll', upload.single('image'), checkUserAuth, postIssues)

scrollingRouter.get('/user/scroll', checkUserAuth, getIssues)

scrollingRouter.patch('/user/scroll/:id', upload.fields([
    { name: "image", maxCount:1},
]), checkUserAuth, updateIssues)

scrollingRouter.delete('/user/scroll/:id', upload.fields([
    { name: "image", maxCount:1},
]), checkUserAuth, deleteIssue)