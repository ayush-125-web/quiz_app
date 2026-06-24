import express from 'express'
import mongoose from 'mongoose'
import { connect_To_DB } from './db.js'
import {createServer} from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app=express()
const httpServer=createServer(app);
const io=new Server(httpServer,{
    cors:{origin:'http://localhost:5173'}
})

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json())


await connect_To_DB();

httpServer.listen(process.env.PORT,()=>{
    console.log('server is running')
})