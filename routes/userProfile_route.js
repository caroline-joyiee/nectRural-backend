import { Router } from "express";
import multer from "multer";
import { upload } from "../middleware/upload.js";
import { checkUserAuth } from "../middleware/auth.js";
import { deleteProfile, getAllProfile, postProfile, updateUserProfile } from "../controllers/userProfile.js";


export const userProfileRoute = Router();

userProfileRoute.post('/user/profile', upload.fields([
    {name: "image", maxCount: 1},
    {name: "profileimage", maxCount: 1},
]), checkUserAuth, postProfile);

// userProfileRoute.post('/user/profiles', upload.single('image'), checkUserAuth, postProfile)

userProfileRoute.get('/user/profiles', checkUserAuth, getAllProfile);

userProfileRoute.patch('/user/profile/:id',

    upload.fields([
        { name: "image", maxCount: 1 },
    ]), checkUserAuth, updateUserProfile)


userProfileRoute.delete('/user/profile/:id', upload.fields([
    { name: "image", maxCount: 1},
]), checkUserAuth, deleteProfile)