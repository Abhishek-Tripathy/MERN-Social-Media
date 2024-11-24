import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'

const PostContext = createContext()

export const PostContextProvider = ({children}) => {

   const [posts, setPosts] = useState([])
   const [reels, setReels] = useState([])
   const [loading, setLoading] = useState(true)
   const [addLoading, setAddLoading] = useState(false)


   async function fetchPosts() {
      try {
         const {data} = await axios.get("/api/post/all")
         console.log("Fetch Posts" ,data);
         
         setPosts(data.posts)
         setReels(data.reels)
         setLoading(false)
      } catch (error) {
         console.log(error);
         setLoading(false)
      }
   }

   async function addPost (formData, setFile, setCaption, setFilePrev, type) {
      console.log("TYPE===", type);
      setAddLoading(true)
      try {
         const {data} = await axios.post(`/api/post/new?type=${type}`,formData)
         console.log("Add post", data);
         
         toast.success(data.message)
         fetchPosts()
         setCaption("")
         setFile("")
         setFilePrev("")
         setAddLoading(false)
      } catch (error) {
         console.log(error);      
         toast.error(error.response.data.message);
         setAddLoading(false);
         setAddLoading(false)
      }
   }

   async function likePost (id) {
      try {
         const res = await axios.post("api/post/like/" + id)
         
         toast.success(res.data.message)
         fetchPosts()
      } catch (error) {
         console.error(error);      
         toast.error(error.response.data.message);
      }
   }

   async function addComment (id, comment, setComment, setShow) {
      try {
         const {data} = await axios.post("api/post/comment/" + id, {comment})
         
         toast.success(data.message)
         fetchPosts()
         setComment("")
         setShow(false)
      } catch (error) {
         console.error(error);      
         toast.error(error.response.data.message);
      }
   }

   useEffect(() => {
      fetchPosts()
   }, [])


   return <PostContext.Provider value={{reels, posts, addPost, likePost, addComment, loading,
      addLoading, 
   }}>{children}</PostContext.Provider>
}

export const PostData = () => useContext(PostContext)