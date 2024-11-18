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

dotenv.config()

const port = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(cookieParser())

connectDb()
connectCloudinary()

//Routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/messages', messagesRoutes)

app.listen(port, () => {
   console.log("Listening at port", port);
})