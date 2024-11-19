import express from "express";
import {
  followFollowingData,
  followUnfollow,
  getAllUsers,
  myProfile,
  updatePassword,
  updateProfile,
  userProfile } from "../controllers/userController.mjs";
import { isAuth } from "../middleware/isAuth.mjs";
import uploadFile from "../middleware/multer.mjs";

const router = express.Router();

router.get("/me", isAuth, myProfile);
router.get("/all", isAuth, getAllUsers);
router.get("/:id", isAuth, userProfile);
router.post("/:id", isAuth, updatePassword);
router.put("/:id", isAuth, uploadFile, updateProfile);
router.post("/follow/:id", isAuth, followUnfollow);
router.get("/followData/:id", isAuth, followFollowingData);

export default router;
