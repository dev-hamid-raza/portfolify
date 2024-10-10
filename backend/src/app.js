import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'

const app = express()

// configuring the cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true, limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())

app.use(passport.initialize())

// routes imports
import userRouter from './routes/user.routes.js'
import portfolioRouter from './routes/portfolio.routes.js'
import chatroomRouter from './routes/chatRoom.routes.js'
// routes declaration
app.use('/api/v1/users', userRouter)
app.use('/api/v1/portfolio', portfolioRouter)
app.use('/api/v1/chatroom',chatroomRouter)



export { app }