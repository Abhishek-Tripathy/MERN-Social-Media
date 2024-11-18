import getDataUrl from "../config/dataUriGenerator.mjs"
import generateToken from "../config/generateToken.mjs"
import { User } from "../models/UserMOdel.mjs"
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'


export const registerUser = async (req, res) => {
   try {
      const {name, email, password, gender} = req.body
      const file = req.file

      if(!name || !email || !password || !gender || !file) {
         return res.status(400).json({success: false, message: "Give all the details"})
      }

      let user = await User.findOne({email})
      if(user) return res.status(400).json({success: false, message: "User already exists"})

      const fileUrl = getDataUrl(file)

      const hashedPassword = await bcrypt.hash(password, 10)

      const mycloud = await cloudinary.v2.uploader.upload(fileUrl.content)

      user = await User.create({
         name,
         email, 
         password: hashedPassword,
         gender,
         profilePic: {
            id: mycloud.public_id,
            url: mycloud.secure_url
         }
      })

      generateToken(user._id, res)

      res.status(201).json({success: true, message: "Account created successfully", user})

   } catch (error) {
      console.log(error);
      res.status(500).json({success: false, message: error.message})
   }
}

export const loginUser = async (req, res) => {
   try {
      const {email, password} = req.body

      const user = await User.findOne({email})
      
      if(!user) {
         return res.status(404).json({success: false, message: "Invalid Credentials"})
      }

      const comaprePass = await bcrypt.compare(password, user.password)

      if(!comaprePass) {
         return res.status(400).json({success: false, message: "Invalid credentials"})
      }

      generateToken(user._id, res)

      res.json({message: "User loggedin successfully", user})

   } catch (error) {
      console.log(error);
      res.status(500).json({success: false, message: error.message})
   }
}

export const logout = async (req, res) => {
   try {
      res.cookie("token", "", {maxAge: 0})

      res.status(200).json({message: "Logged Out Successfully"})
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}