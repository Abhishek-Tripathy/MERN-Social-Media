import React, { useState, useEffect } from 'react'
import { ChatData } from '../context/ChatContext'
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Chat from '../chat/Chat';
import MessageContainer from '../chat/MessageContainer';
import { SocketData } from '../context/SocketContext';

function ChatPage({user}) {

   const {createChat, chats, setChats, selectedChat, setSelectedChat} = ChatData()
   const {onlineUsers, socket} = SocketData()
   const [users, setUsers] = useState([]);
   const [query, setQuery] = useState("");
   const [search, setSearch] = useState(false);

   async function fetchAllUsers() {
      try {
        const { data } = await axios.get("/api/user/all?search=" + query);
  
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }

   const getAllChats = async () => {
      try {
        const { data } = await axios.get("/api/messages/chats");
        setChats(data);
      } catch (error) {
        console.log(error);
      }
   };

   const createNewChat = async (id) => {
      await createChat(id)
      setSearch(false)
      getAllChats()
   }
  
   useEffect(() => {
      fetchAllUsers();
    }, [query]);
  
   useEffect(() => {
      getAllChats();
    }, []);

  return (
    <div className='w-[100%] md:w-[750px] md:p-4'>
      <div className="flex gap-4 mx-auto">
         <div className="w-[30%]">
            <div className="top">
               <button className="bg-blue-500 text-white px-3 py-1 rounded-full"
               onClick={() => setSearch(!search)}>{search ? "X" : <FaSearch />}</button>
               {search ? <>
                  <input type="text" className="custom-input" style={{ width: "100px", border: "gray solid 1px" }} placeholder="Enter name"
                  value={query} onChange={(e) => setQuery(e.target.value)} />
                  <div className="users">
                     {users && users.length>0 ? users.map((e) => (
                        <div onClick={() => createNewChat(e._id)}
                        className='bg-gray-500 text-white p-2 mt-2 cursor-pointer flex justify-center items-center gap-2'>
                           <img src={e.profilePic.url} className="w-8 h-8 rounded-full" />
                           {e.name}
                        </div>
                     )) : <p></p>}
                  </div>
               </> : 
               <div className="flex flex-col justify-center items-center mt-2">
                  {
                     chats.map((e) => (
                        <Chat key={e._id} chat={e} setSelectedChat={setSelectedChat} 
                        isOnline={onlineUsers.includes(e.users[0]._id)} />
                     ))
                  }
               </div>}
            </div>
         </div>
         {selectedChat === null ? <div className="w-[70%] mx-20 mt-40 text-2xl">Hello 👋 {user.name}, select a chat to start conversation</div> : (
            <div className="w-[70%]">
               <MessageContainer selectedChat={selectedChat} setChats={setChats} />
            </div>
         )}
         
      </div>
    </div>
  )
}

export default ChatPage