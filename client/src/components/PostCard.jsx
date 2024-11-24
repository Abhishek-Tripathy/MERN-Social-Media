import React, { useEffect, useState } from 'react'
import { BsChatFill, BsThreeDotsVertical } from 'react-icons/bs'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'
import { MdDelete } from "react-icons/md";
 
function PostCard({type, value}) {
   const [isLike, setIsLike] = useState(false)
   const [show, setShow] = useState(false)
   const {user} = UserData()
   const {likePost, addComment} = PostData()
   const [comment, setComment] = useState("")
   const formatDate = format(new Date(value.createdAt), "MMMM do");

   const likeHandler = () => {
      setIsLike(!isLike)
      likePost(value._id)
   }

   const addCommentHandler = (e) => {
      e.preventDefault()
      addComment(value._id, comment, setComment, setShow)
   }
 
   useEffect(() => {
      for(let i=0; i<value.likes.length; i++){
         if(value.likes[i] === user._id) setIsLike(true)
      }
   }, [value, user._id])
   
  return (
    <div className="bg-gray-100 flex items-center justify-center pt-3 pb-14">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md" >
         <div className="flex items-center space-x-2">
            <Link to={`/user/${value.owner._id}`}>
               <img src={value.owner.profilePic.url} alt="" className="w-8 h-8 rounded-full" />
            </Link>
            <div>
               <Link to={`/user/${value.owner._id}`}>
                  <p className="text-gray-800 font-semibold">{value.owner.name}</p>
               </Link>
               <div className="text-gray-500 text-sm">{formatDate}</div>
            </div>
            {value.owner._id===user._id && (
               <div className="text-gray-500 cursor-pointer">
                  <button className="hover:bg-gray-50 rounded-full p-1 text-2xl"><BsThreeDotsVertical /></button>
               </div>
            )}
         </div>
         <div className='mb-4'>
            <p className='text-gray-800'>{value.caption}</p>
         </div>
         <div className="mb-4">
            {type==="post" ? <img src={value.post.url} className='object-cover rounded-md' /> : 
            <video src={value.post.url} className="w-[450px] h-[600px] object-cover rounded-md" autoPlay controls />}
         </div>
         <div className="flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-2">
               <span onClick={likeHandler} className='text-red-500 text-2xl cursor-pointer'>
                  {isLike ? <IoHeartSharp /> : <IoHeartOutline />} 
               </span>
               <button className='hover:bg-gray-50 rounded-full p-1'>{value.likes.length}</button>
            </div>
            <button onClick={() => setShow(!show)} className='flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1'>
               <BsChatFill />
               <span>{value.comments.length} Comments</span>
            </button>
         </div>
         {
            show && (
               <form onSubmit={addCommentHandler} className='flex gap-3'>
                  <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className='custom-input' placeholder='Enter Comment' />
                  <button type='submit' className='bg-gray-100 rounded-lg px-5 py-2'>Add</button>
               </form>
            )
         }
         <hr className='mt-2 mb-2' />
         <p className="text-gray-800 font-semibold">Comments</p>
         <hr className='mt-2 mb-2' />
         <div className="mt-4">
            <div className="comments max-h-[200px] overflow-y-auto">
               {
                  value.comments && value.comments.length > 0 ? 
                  value.comments.map((comment) => (
                     <Comment key={comment._id} comment={comment} user={user} />
                  )) :
                  <p>No Comments</p>
               }
            </div>
         </div>
      </div>
    </div>
  )
}

export default PostCard


export const Comment = ({comment, user}) => {
   return (
      <div className="flex items-center space-x-2 mt-2">
         <Link to={`/user/${comment.user._id}`}>
            <img src={comment.user.profilePic.url} className='w-8 h-8 rounded-full' />
         </Link>
         <div>
            <p className="text-gray-800 font-semibold">{comment.user.name}</p>
            <p className="text-gray-500 text-sm">{comment.comment}</p>
         </div>
         {
            comment.user._id === user._id && (
               <button className="text-red-500"><MdDelete /></button>
            )
         }
      </div>
   )
}