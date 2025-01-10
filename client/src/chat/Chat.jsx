import React from 'react'
import { UserData } from '../context/UserContext';
import { BsSendCheck } from "react-icons/bs";

function Chat({setSelectedChat, chat, isOnline }) {
   const {user:loggedInUser} = UserData()
   let user;
   if(chat) user = chat.users[0]
  return (
   <div>
   {user && (
      <div
         onClick={() => setSelectedChat(chat)}
         className="bg-gradient-to-r from-blue-100 to-purple-200 py-4 px-8 rounded-xl cursor-pointer mt-4 hover:from-blue-300 hover:to-purple-300 transition duration-300 ease-in-out"
      >
         <div className="flex justify-start items-center gap-3">
            {isOnline && (
               <div className="text-3xl font-bold text-green-400">
                  <span>&#8226;</span>
               </div>
            )}
            <img
               src={user.profilePic.url}
               className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="text-lg font-medium text-gray-900">{user.name}</span>
         </div>
         <span className="flex justify-start items-center gap-2 mt-2 text-gray-600 text-sm">
            {loggedInUser._id === chat.latestMessage.sender && (
               <BsSendCheck className="text-green-500 text-xl" />
            )}
            <span className="truncate">{chat.latestMessage.text.slice(0, 18)}...</span>
         </span>
      </div>
   )}
</div>

  )
}

export default Chat