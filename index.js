import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user-route.js";
import { userProfileRoute } from "./routes/userProfile_route.js";
import session from "express-session";
import cors from "cors";
import { interactionsRouter } from "./routes/interaction.js";
import { scrollingRouter } from "./routes/scrollingPAge-route.js";
import expressOasGenerator from '@mickeymond/express-oas-generator';
import { notificationRouter } from "./routes/notification-route.js";
import http from 'http';
import { Server } from "socket.io";
import { setupSocket } from "./socket io/socket.js";


const app = express()
const server= http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"*",
    methods:["GET", "POST"]
  }
});

setupSocket(io);

app.use(cors({ credentials: true, origin: "*" }))

// expressOasGenerator.init(app, {});
expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  tags: ['user', 'userProfile', 'scrollingPage', 'interactions'],
  mongooseModels: mongoose.modelNames(),
})

dbConnection();



app.use(express.json());

app.use("/api/v1/health", (req, res) => {
  res.json({ status: "UP" })
})



app.use(userProfileRoute);
app.use(userRouter);
app.use(interactionsRouter)
app.use(scrollingRouter);
app.use(notificationRouter);

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }

}))




expressOasGenerator.handleRequests(app, {
  alwaysServeDocs: true
})

app.use((req, res) => res.redirect('/api-docs/'));


const port = process.env.PORT || 9875
app.listen(port, () => {
  console.log(`App is working ${port} port`)

})
