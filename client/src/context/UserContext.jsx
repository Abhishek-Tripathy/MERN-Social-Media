import { createContext, useContext, useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'


const UserContext = createContext()


export const UserContextProvider = ({children}) => {
   const [user, setUser] = useState([])
   const [auth, setAuth] = useState(false)
   const [loading, setLoading] = useState(true)

   async function loginUser (email, password, navigate){
      setLoading(true)
      try {
         const {data} = await axios.post("/api/auth/login", {email, password})
         
         toast.success(data.message)
         setAuth(true)
         setUser(data.user)
         navigate("/")
         setLoading(false)
      } catch (error) {
         console.log(error);
         toast.error(error.response.data.message)
         setLoading(false)
      }
   }

   async function fetchUser () {
      try {
         const {data} = await axios.get('/api/user/me')
         console.log(data);
         
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

   async function registerUser (formData, navigate) {
      setLoading(tre)
      try {
         const {data} = await axios.post("/api/auth/register", formData)
         
         toast.success(data.message)
         setAuth(true)
         setUser(data.user)
         navigate("/")
         setLoading(false)
      } catch (error) {
         toast.error(error.response.data.message)
         setLoading(false)
      }
   }


   useEffect(() => {
      fetchUser()
   }, [])

   return   <UserContext.Provider value={{loginUser, auth, setAuth, user, setUser, loading, logoutUser,
      registerUser, 
   }}>  
               {children}
               <Toaster />
            </UserContext.Provider>
}

export const UserData = () => useContext(UserContext)