import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.mjs'
import userRoutes from './routes/userRoutes.mjs'
import authRoutes from './routes/authRoutes.mjs'
import postRoutes from './routes/postRoutes.mjs'
import messagesRoutes from './routes/messageRoutes.mjs'
import connectCloudinary from './config/cloudinary.mjs'
import cookieParser from 'cookie-parser'
import {server, app} from "./socket/socket.mjs"
import path from "path"
import { fileURLToPath } from 'url'
 
dotenv.config()

const port = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
   origin: true, 
   credentials: true, 
};
app.use(cors(corsOptions))

connectDb()
connectCloudinary()

// app.get('/', (req, res) => {
//    res.send('Server is running!');
// });

//Routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/messages', messagesRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..'); // Move up one level from `server`

app.use(express.static(path.join(rootDir, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'dist', 'index.html'));
});


server.listen(port, () => {
   console.log("Listening at port", port);
})