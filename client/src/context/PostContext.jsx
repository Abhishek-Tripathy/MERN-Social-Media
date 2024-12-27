import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'

const PostContext = createContext()

export const PostContextProvider = ({children}) => {

   const [posts, setPosts] = useState([])
   const [reels, setReels] = useState([])
   const [loading, setLoading] = useState(true)
   const [addLoading, setAddLoading] = useState(false)

   const isTokenAvailable = () => {
      const cookies = document.cookie;
      return cookies.includes("token");
    };

   async function fetchPosts() {
      try {
         const {data} = await axios.get("/api/post/all")
         
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

   async function deletePost (id) {
      setLoading(true)
      try {
         const res = await axios.delete('/api/post/' + id)
         
         toast.success(res.data.message)
         fetchPosts()
         setLoading(false)
      } catch (error) {
         console.error(error);      
         toast.error(error.response.data.message);
         setLoading(false)
      }
   }

   async function deleteComment (id, commentId) {
      setLoading(true)
      try {
         const res = await axios.delete(`/api/post/comment/${id}?commentId=${commentId}`)
         
         toast.success(res.data.message)
         fetchPosts()
         //setLoading(false)
      } catch (error) {
         console.error(error);      
         toast.error(error.response.data.message);
         //setLoading(false)
      }
   }

   useEffect(() => {
      if (isTokenAvailable()) {
         fetchPosts()
       } else {
         setLoading(false);
       }
   }, [])


   return <PostContext.Provider value={{reels, posts, addPost, likePost, addComment, loading,
      addLoading, fetchPosts, deletePost, deleteComment,
   }}>{children}</PostContext.Provider>
}

export const PostData = () => useContext(PostContext)