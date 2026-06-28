import express from 'express'
import mongoose from 'mongoose'
import { connect_To_DB } from './db.js'
import {createServer} from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import {router as quizRoutes} from './routes/quiz.js'
import {router as roomRoutes} from './routes/room.js'
import 'dotenv/config'

const app=express()
const httpServer=createServer(app);
const io=new Server(httpServer,{
    cors:{origin:process.env.FRONTEND_URL},
    method:['GET','POST','DELETE','PUT']
})

app.use(cors({origin:process.env.FRONTEND_URL}))
app.use(express.json())
app.use('/admin',roomRoutes)
app.use('/admin',quizRoutes)



await connect_To_DB();

import setUpSocket from './socket/socketHandler.js'
setUpSocket(io)


httpServer.listen(process.env.PORT,()=>{
    console.log('server is running')
})