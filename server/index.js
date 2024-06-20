import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import './config/db.js'
import { Router } from './routes/routes.js'


const app=express()
//converts the data to json format...
app.use(express.json())
app.use(cors())




//giving the path....
dotenv.config({path:"./config/.env"})

/////when server runs,it will import the below router file....
app.use('/contactmsyt',Router)


app.listen(process.env.PORT,()=>{
    console.log("app is running")
}) 