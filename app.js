import express from 'express'
import dotenv from 'dotenv'
import   bootstrap from './src/bootstrap.js'
import connect from './db/connected.js'


dotenv.config()

const app =express()
connect()
bootstrap(app)

const PORT = +process.env.PORT



app.listen(PORT,()=>console.log(`listening on port ${PORT}`))