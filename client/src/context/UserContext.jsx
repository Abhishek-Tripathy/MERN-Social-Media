import { createContext, useContext, useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'


const UserContext = createContext()


export const UserContextProvider = ({children}) => {
   const [user, setUser] = useState([])
   const [auth, setAuth] = useState(false)
   const [loading, setLoading] = useState(true)

   async function loginUser (email, password, navigate, fetchPosts){
      setLoading(true)
      try {
         const {data} = await axios.post("/api/auth/login", {email, password})
         
         toast.success(data.message)
         setAuth(true)
         setUser(data.user)
         navigate("/")
         setLoading(false)
         fetchPosts()
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message)
         setLoading(false)
      }
   }

   async function fetchUser () {
      try {
         const {data} = await axios.get('/api/user/me')
         
         setAuth(true)
         setUser(data.user)
         setLoading(false)
      } catch (error) {
         console.log(error);
         setAuth(false)
         setLoading(false)
      }
   }

   async function logoutUser (navigate) {
      try {
         const {data} = await axios.post("/api/auth/logout")

         if(data.message) {
            toast.success(data.message)
            setUser([])
            setAuth(false)
            navigate('/login')
         }
      } catch (error) {
         toast.error(error.response.data.message)
      }
   }

   async function registerUser (formData, navigate, fetchPosts) {
      setLoading(tre)
      try {
         const {data} = await axios.post("/api/auth/register", formData)
         
         toast.success(data.message)
         setAuth(true)
         setUser(data.user)
         navigate("/")
         setLoading(false)
         fetchPosts()
      } catch (error) {
         toast.error(error.response.data.message)
         setLoading(false)
      }
   }

   async function updateProfilePic (id, formData, setFile) {
      try {
         const {data} = await axios.put('/api/user/' + id, formData)

         toast.success(data.message)
         fetchUser()
         setFile(null)
      } catch (error) {
         toast.error(error.response.data.message)
         console.log(error)
      }
   }

   async function updateProfileName (id, name, setName) {
      try {
         const {data} = await axios.put('/api/user/' + id, {name})

         toast.success(data.message)
         fetchUser()
         setName("")
      } catch (error) {
         toast.error(error.response.data.message)
         console.log(error)
      }
   }

   async function updatePassword (id, oldPassword, newPassword, setShowUpdatePass) {
      try {
         const { data } = await axios.post("/api/user/" + id, {oldPassword, newPassword});
   
         data.success ? toast.success(data.message) : toast.error(data.message);
         console.log(data.message)
         setShowUpdatePass(false)
       } catch (error) {
         console.log(error)
         toast.error(error.response.data.message);
       }
   }

   async function followUser(id, fetchUser) {
      try {
        const { data } = await axios.post("/api/user/follow/" + id);
  
        toast.success(data.message);
        fetchUser();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

   useEffect(() => {
      fetchUser()
   }, [])

   return   <UserContext.Provider value={{loginUser, auth, setAuth, user, setUser, loading, logoutUser,
      registerUser, updateProfilePic, updateProfileName, updatePassword, followUser
   }}>  
               {children}
               <Toaster />
            </UserContext.Provider>
}

export const UserData = () => useContext(UserContext)