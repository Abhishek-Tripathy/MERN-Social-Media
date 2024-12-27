import getDataUrl from "../config/dataUriGenerator.mjs";
import { User } from "../models/UserModel.mjs";
import cloudinary from 'cloudinary'
import bcrypt from 'bcrypt'


export const myProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select("-password")

      res.json({message: "profile fetched", user})
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const userProfile = async (req, res) => {
   try {
      const {id} = req.params

      const user = await User.findById(id).select("-password")

      if(!user) return res.status(404).json({message: "User not found"})

      res.json({message: "User Fetched", user})
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const followUnfollow = async (req, res) => {
   try {
      const user = await User.findById(req.params.id)
   const loggedInUser = await User.findById(req.user._id)

   if(user._id.toString() === loggedInUser._id.toString()){
      return res.json({message: "Cant follow yourself"})
   }

   if(user.followers.includes(loggedInUser._id)){
      const indexFollower = user.followers.indexOf(loggedInUser._id)
      const indexFollowing = loggedInUser.following.indexOf(user._id)

      loggedInUser.following.splice(indexFollowing, 1)
      user.followers.splice(indexFollower, 1)

      await loggedInUser.save()
      await user.save()

      res.json({message: "User unfollowed successfully"})
   }else{
      loggedInUser.following.push(user._id)
      user.followers.push(loggedInUser._id)

      await loggedInUser.save()
      await user.save()

      res.json({message: "User followed successfully"})
   }
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const followFollowingData = async (req, res) => {
   try {
      const user = await User.findById(req.params.id).select("-password")
      .populate("followers", "-password")
      .populate("following", "-password")

      const followers = user.followers
      const following = user.following

      res.json({followers, following})

   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const updateProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user._id)

      const {name} = req.body
      if(name){
         user.name = name
      }

      const file = req.file
      if(file) {
         const fileUrl = getDataUrl(file)
         await cloudinary.v2.uploader.destroy(req.user.profilePic.id)
         const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content)

         user.profilePic.id = myCloud.public_id
         user.profilePic.url = myCloud.secure_url
      }

      await user.save()

      res.json({message: "profile Updated"})

   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const updatePassword = async (req, res) => {
   try {
      const {newPassword, oldPassword} = req.body
      const user = await User.findById(req.user._id)

      const compare = await bcrypt.compare(oldPassword, user.password)

      if(!compare) return res.json({message: "Enter correct old Password", success: false})

      user.password = await bcrypt.hash(newPassword, 10)

      await user.save()
      res.json({message: "Password updated" , success: true})
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const getAllUsers = async (req, res) => {
   try {
      const search = req.query.search || ""
      const users = await User.find({
         name: {
            $regex: search,
            $options: "i"
         },
         _id: {$ne: req.user._id}
      }).select("-password")

      res.json(users)
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

