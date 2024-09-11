import { Router } from "express";
import { deleteIssue, getAllIssues, getIssues, postIssues, updateIssues } from "../controllers/scrolling-page.js";
import { upload } from "../middleware/upload.js";
import { checkUserAuth } from "../middleware/auth.js";

export const scrollingRouter = new Router()

scrollingRouter.post('/user/post', upload.fields([
    {name: "image", maxCount: 5}]),
     checkUserAuth, postIssues)

scrollingRouter.get('/user/post', checkUserAuth, getIssues)

scrollingRouter.get('/user/posts', checkUserAuth, getAllIssues);


scrollingRouter.patch('/user/post/:id', upload.fields([
    { name: "image", maxCount:5},
]), checkUserAuth, updateIssues)

scrollingRouter.delete('/user/post/:id', upload.fields([
    { name: "image", maxCount:5},
]), checkUserAuth, deleteIssue)