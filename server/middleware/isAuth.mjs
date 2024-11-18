import jwt from 'jsonwebtoken'
import { User } from '../models/UserMOdel.mjs'

export const isAuth = async (req, res, next) => {
   try {
      const token = req.cookies.token

      if(!token) return res.status(403).json({message: "Unauthorised"})

      const decode = jwt.verify(token, process.env.JWT_SECRET)
      if(!decode) return res.status(403).json({message: "Token expired"})

      req.user = await User.findById(decode.id)

      next()
   } catch (error) {
      console.log(error);
   }
}

