import express from 'express'
import mongoose from 'mongoose'
import { connect_To_DB } from './db.js'
import {createServer} from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import {router as quizRoutes} from './routes/quiz.js'
import {router as roomRoutes} from './routes/room.js'

const app=express()
const httpServer=createServer(app);
const io=new Server(httpServer,{
    cors:{origin:'http://localhost:5173'}
})

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json())
app.use('/admin',quizRoutes)
app.use('/admin',roomRoutes)


await connect_To_DB();

httpServer.listen(process.env.PORT,()=>{
    console.log('server is running')
})