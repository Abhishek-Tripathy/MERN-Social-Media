import React, { useEffect, useRef, useState } from 'react'
import { UserData } from '../context/UserContext'
import axios from "axios";
import { LoadingAnimation } from '../components/Loading';
import Message from './Message';
import MessageInput from './MessageInput';
import { SocketData } from '../context/SocketContext';


function MessageContainer({selectedChat, setChats}) {
   const [messages, setMessages] = useState([])
   const {user} = UserData()
   const [loading, setLoading] = useState(false);
   const { socket } = SocketData();

   useEffect(()=> {
      socket.on("newMessage", (message) => {
         if(selectedChat._id===message.chatId){
            setMessages((prev)=> [...prev, message])
         }
      })
      setChats((prev)=>{
         const updatedChat = prev.map((chat)=>{
            if(chat._id===messages.chatId){
               return {...chat, latestMessage: {text: messages.text, sender: messages.sender}}
            }
            return chat
         })
         return updatedChat
      })

      return ()=>socket.off("newMessage")
   },[socket])

   async function fetchMessages(){
      setLoading(true)
      try {
         const { data } = await axios.get("/api/messages/" + selectedChat.users[0]._id);
         
         setMessages(data.messages);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }
   
   useEffect(() => {
      fetchMessages();
    }, [selectedChat]);

    const messageContainerRef = useRef(null)

    useEffect(()=>{
      if(messageContainerRef.current){
         messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
      }
    }, [messages])
    
  return (
    <div>
      {
         selectedChat && (
            <div className="flex flex-col">
               <div className="flex w-full h-12 items-center gap-3">
                  <img src={selectedChat.users[0].profilePic.url} className="w-8 h-8 rounded-full" />
                  <span>{selectedChat.users[0].name}</span>
               </div>
               {loading ? (<LoadingAnimation />) : (
                  <>
                     <div ref={messageContainerRef} className="flex flex-col gap-4 my-4 h-[400px] overflow-y-auto border border-gray-300 bg-gray-100 p-3">
                        {messages && messages.map((e) => (
                           <Message key={e._id} message={e.text} ownMessage={e.sender===user._id && true} />
                        ))}
                     </div>
                     <MessageInput setMessages={setMessages} selectedChat={selectedChat}  />
                  </>
               )}
            </div>
         )
      }
    </div>
  )
}

export default MessageContainer