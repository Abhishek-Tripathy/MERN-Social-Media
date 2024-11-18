import express from 'express'
import { commentOnPost, deleteComment, deletePost, editPost, getAllPosts, likeUnlikePost, newPost } from '../controllers/postController.mjs'
import { isAuth } from '../middleware/isAuth.mjs'
import uploadFile from '../middleware/multer.mjs'

const router = express.Router()

router.post("/new", isAuth, uploadFile, newPost)
router.delete("/:id", isAuth, deletePost)
router.put("/:id", isAuth, editPost)
router.get("/all", isAuth, getAllPosts)
router.post("/like/:id", isAuth, likeUnlikePost)
router.post("/comment/:id", isAuth, commentOnPost)
router.delete("/comment/:id", isAuth, deleteComment)

export default router