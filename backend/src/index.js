import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import http from 'http'

dotenv.config({path: './env'})


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId)
        console.log(`User ${socket.id} joined room: ${roomId}`,)
    })

    socket.on('chatMessage', (data) => {
        const {roomId, message } = data
        io.to(roomId).emit('message', message)
        console.log(`Message from ${socket.id} in room ${roomId}:`, message)
    })
    
    socket.on('disconnect', () => {
        console.log('User disconnect:', socket.id)
    })
})

connectDB()
.then(() => {
    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })

})
.catch((error) => {
    console.log('MongoDB connection is failed!', error)
})