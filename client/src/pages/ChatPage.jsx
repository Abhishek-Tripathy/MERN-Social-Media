import React, { useState, useEffect } from "react";
import { ChatData } from "../context/ChatContext";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Chat from "../chat/Chat";
import MessageContainer from "../chat/MessageContainer";
import { SocketData } from "../context/SocketContext";

function ChatPage({ user }) {
  const { createChat, chats, setChats, selectedChat, setSelectedChat } =
    ChatData();
  const { onlineUsers, socket } = SocketData();
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
    await createChat(id);
    setSearch(false);
    getAllChats();
  };

  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  return (
   <div className="w-full min-h-screen bg-gradient-to-b from-blue-200 via-purple-300 to-blue-100">
   <div className="flex gap-4 mx-auto min-h-screen">
     <div className="w-[30%]">
       <div className="top">
         <button
           className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-full m-4 hover:from-blue-500 hover:to-purple-600"
           onClick={() => setSearch(!search)}
         >
           {search ? "X" : <FaSearch />}
         </button>
         {search ? (
           <>
             <input
               type="text"
               className="custom-input bg-white border border-gray-300 rounded-md px-4 py-2 w-full max-w-xs"
               placeholder="Enter name"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
             />
             <div className="users mt-4 bg-white p-4 rounded-md shadow-md">
               {users && users.length > 0 ? (
                 users.map((e) => (
                   <div
                     onClick={() => createNewChat(e._id)}
                     className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-2 mt-2 cursor-pointer flex justify-center items-center gap-2 rounded-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-600"
                   >
                     <img
                       src={e.profilePic.url}
                       className="w-8 h-8 rounded-full"
                     />
                     {e.name}
                   </div>
                 ))
               ) : (
                 <p>No users found</p>
               )}
             </div>
           </>
         ) : (
           <div className="flex flex-col justify-center items-center mt-2">
             {chats.map((e) => (
               <Chat
                 key={e._id}
                 chat={e}
                 setSelectedChat={setSelectedChat}
                 isOnline={onlineUsers.includes(e.users[0]._id)}
               />
             ))}
           </div>
         )}
       </div>
     </div>
     {selectedChat === null ? (
       <div className="w-[70%] mx-20 mt-40 text-2xl text-center text-gray-800">
         Hello 👋 {user.name}, select a chat to start conversation
       </div>
     ) : (
       <div className="w-[70%]">
         <MessageContainer selectedChat={selectedChat} setChats={setChats} />
       </div>
     )}
   </div>
 </div>

   );
}

export default ChatPage;
