import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user-route.js";
import { userProfileRoute } from "./routes/userProfile_route.js";
import session from "express-session";
import cors from "cors";
import { interactionsRouter } from "./routes/interaction.js";
import { scrollingRouter } from "./routes/scrollingPAge-route.js";

const app = express()
app.use(cors({ credentials: true, origin: "*" }))



dbConnection();


app.use(express.json());


app.use(express.static('image'));
// app.use(express.static('profileImage'))
app.use(userProfileRoute);
app.use(userRouter);
app.use(interactionsRouter)
app.use(scrollingRouter);

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // store: createMongoStore({ mongoUrl: process.env.Mongo_Url})
    cookie: { secure: true }

  }))


const port = process.env.PORT || 9875

app.listen(port, () => {
 console.log(`App is working ${port} port`)
})
