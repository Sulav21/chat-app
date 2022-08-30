import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {Server} from 'socket.io'
const app = express()

const PORT = process.env.PORT || 8000

// middlewares
app.use(cors())
app.use(express.json())

// Database connection
import { dbConnection } from './db/dbConfig.js'
dbConnection()

// user router
import userRouter from './routers/userRouter.js'
app.use('/api/v1',userRouter)

import messageRouter from './routers/messagesRouter.js'
app.use('/api/v1/msg',messageRouter)



app.get('/',(req,res)=>{
res.json({
    message:"You have reached the admin api"
})
})

// Global error handling

app.use((err,req,res,next)=>{
    console.log(err)
        res.status(err.status || 404)
        res.json({
            status:'error',
            message:err.message
        })
    })


   const serverE =  app.listen(PORT, (error)=>{
        error && console.log(error)
        console.log(`Your server is running on PORT: ${PORT}`)
    })


const io = new Server(serverE,{
    cors:{
        origin:'http://localhost:3000',
        credentials:true,
    }
})

global.onlineUsers = new Map()
io.on('connection',(socket)=>{
    global.chatSocket = socket;
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on('send-msg',(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-receive', data.msg)
        }
    })
})

