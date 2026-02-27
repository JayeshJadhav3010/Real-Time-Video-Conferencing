import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import {connectToSocket} from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js"

const app=express();
const server = createServer(app);

const io=connectToSocket(server);

app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);
// app.use("/api/v2/users",newUserRoutes);
app.get("/",(req,res)=>{
    res.send("hello");
})

const start=async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://jadhav3010jay_db_user:Jayesh3010@cluster0.5qanwcy.mongodb.net/");

    console.log(`MONGO Connection DB Host:${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
    console.log("listening on port 8000");
});
}

start();