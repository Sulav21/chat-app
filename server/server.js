import express from 'express'
import cors from 'cors'
import 'dotenv/config'

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


    app.listen(PORT, (error)=>{
        error && console.log(error)
        console.log(`Your server is running on PORT: ${PORT}`)
    })





