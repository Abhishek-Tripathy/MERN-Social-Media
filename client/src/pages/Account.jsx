import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'

function Account({user}) {
   const navigate = useNavigate()
   const {logoutUser} = UserData()
   const {posts, reels} = PostData()

   let myPosts ;

   if(posts){
      myPosts = posts.filter((post) => post.owner._id===user._id)
   }
   console.log(myPosts);

   let myReels ;

   if(reels){
      myReels = reels.filter((reel) => reel.owner._id===user._id)
   }
   console.log(myReels);
   
   
   const logoutHandler = () => {
      logoutUser(navigate)
   }

  return (
    <>
      {user && (
      <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
         <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
            <div className="image flex flex-col justify-between mb-4 gap-4">
               <img src={user.profilePic.url} className="w-[180px] h-[180px] rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
               <p className="text-gray-800 font-semibold">{user.name}</p>
               <p className="text-gray-500 text-sm">{user.email}</p>
               <p className="text-gray-500 text-sm">{user.gender}</p>
               <p className="text-gray-500 text-sm">{user.followers.length}</p>
               <p className="text-gray-500 text-sm">{user.following.length}</p>
               <button onClick={logoutHandler} className='bg-red-500 text-white rounded-md'>LogOut</button>
            </div>
         </div>
      </div>)}
    </>
  )
}

export default Account