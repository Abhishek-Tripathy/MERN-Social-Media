import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { UserData } from './context/UserContext'
import Account from './pages/Account'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Reels from './pages/Reels'
import { Loading } from './components/Loading'
import UserAccount from './pages/UserAccount'
import Search from './pages/Search'
import ChatPage from './pages/ChatPage'
import TopNavbar from "./components/TopNavbar.jsx"

function App() {
  const {loading, auth, user} = UserData()

  return (
    <>
      {loading ? <Loading /> : <BrowserRouter  future={{ v7_startTransition: true , v7_relativeSplatPath: true,}}>  
        
      <div className='mt-10 sm:mt-0'>
          {auth && <TopNavbar />}
            <Routes>
              <Route path="/" element={auth ? <Home /> : <Login />} />
              <Route path="/reels" element={auth ? <Reels /> : <Login />} />
              <Route path="/account" element={auth ? <Account user={user} /> : <Login />} />
              <Route path="/user/:id" element={auth ? <UserAccount user={user} /> : <Login />} />
              <Route path="/register" element={!auth ? <Register /> : <Home />} />
              <Route path="/login" element={!auth ? <Login /> : <Home />} />
              <Route path="/search" element={auth ? <Search /> : <Login />} />
              <Route path="/chat" element={auth ? <ChatPage user={user} /> : <Login />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            {auth && <Navbar />}
          </div>
      </BrowserRouter>}
    </>
  )
}

export default App
