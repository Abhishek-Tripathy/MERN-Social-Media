import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.mjs'
import uploadFile from '../middleware/multer.mjs'

const router = express.Router()

router.post('/register', uploadFile,registerUser)

router.post('/login', loginUser)

export default router