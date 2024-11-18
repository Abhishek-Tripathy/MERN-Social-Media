import express from 'express'
import { isAuth } from '../middleware/isAuth.mjs'
import { getAllChats, getAllMessages, sendMessage } from '../controllers/messageController.mjs'

const router = express.Router()

router.post('/', isAuth, sendMessage)
router.get('/chats', isAuth, getAllChats)
router.get('/:id', isAuth, getAllMessages)


export default router