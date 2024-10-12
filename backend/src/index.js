import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import http from 'http'
import { socketHandlers } from "./sockets/socketHandlers.js";

dotenv.config({path: './env'})


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

socketHandlers(io)

connectDB()
.then(() => {
    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })

})
.catch((error) => {
    console.log('MongoDB connection is failed!', error)
})