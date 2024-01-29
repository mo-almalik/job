import express from 'express'
import morgan from 'morgan'
import v1Roter from './Router/v1Router.js'
import { AppError } from './utils/error.handler.js'

const bootstrap = (app)=>{

app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1', v1Roter)


app.all('*', (req, res, next) => {
    throw new AppError('Route not found', 404)
})

app.use((err, req, res, next) => {
    const { message, status, stack } = err
    res.status(status || 500).json({
        message,
        ...(process.env.MODE === 'development' && { stack }),
    })
})
}

export default bootstrap