import { Router } from "express";
import multer from "multer";
import { upload } from "../middleware/upload.js";
import { checkUserAuth } from "../middleware/auth.js";
import { deleteProfile, getAllProfile, postProfile, updateUserProfile } from "../controllers/userProfile.js";


export const userProfileRoute = Router();

userProfileRoute.post('/userProfile/profiles', upload.fields([
    {name: "image", maxCount: 1},
    {name: "profileimage", maxCount: 1},
]), checkUserAuth, postProfile);

// userProfileRoute.post('/user/profiles', upload.single('image'), checkUserAuth, postProfile)

userProfileRoute.get('/userProfile/profiles', checkUserAuth, getAllProfile);

userProfileRoute.patch('/userProfile/profile/:id',

    upload.fields([
        { name: "image", maxCount: 1 },
    ]), checkUserAuth, updateUserProfile)


userProfileRoute.delete('/userProfile/profile/:id', upload.fields([
    { name: "image", maxCount: 1},
]), checkUserAuth, deleteProfile)