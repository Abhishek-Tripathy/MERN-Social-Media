import { Chat } from "../models/chatModel.mjs";
import { Messages } from "../models/messageModel.mjs";



export const sendMessage = async (req, res) => {
   try {
      const {recieverId, message} = req.body

      if(!recieverId) return res.json({message: "No reciever Id given"})

      const senderId = req.user._id

      let chat = await Chat.findOne({
         users: {$all: [senderId, recieverId]}
      })

      if(!chat) {
         chat = new Chat({
            users: [senderId, recieverId],
            latestMessage: {
               text: message,
               sender: senderId
            }
         })
      }

      await chat.save()

      const newMessage = new Messages({
         chatId: chat._id,
         sender: senderId,
         text: message
      })

      await newMessage.save()

      await chat.updateOne({
         latestMessage: message,
         sender : senderId
      })

      res.status(201).json({newMessage})

   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const getAllMessages = async (req, res) => {
   try {
      const {id} = req.params
      const senderId = req.user._id

      const chat = await Chat.findOne({
         users: {$all: [senderId, id]}
      })

      if(!chat) return res.status(404).json({message: "No chat found"})

      const messages = await Messages.find({
         chatId : chat._id
      })

      res.json({messages})

   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}

export const getAllChats = async (req, res) => {
   try {
      const chats = await Chat.find({
         users: req.user._id 
      }).populate({
         path: "users",
         select: "name profilePic"
      })

      res.json(chats)
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
}
