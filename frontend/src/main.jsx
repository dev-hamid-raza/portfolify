import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider , createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LandingPage from './pages/home/landing-page.jsx'
import SignIn from './components/SignIn.jsx'
import Register from './components/Register.jsx'
import ProfileDetails from './pages/profileDetail/ProfileDetails.jsx'
import DashBoard from './pages/dashBoard/DashBoard.jsx'
import { ProfileProvider } from './utils/profileContext.jsx'
import Links from './pages/links/Links.jsx'
import SocialAccounts from './pages/socialAccounts/SocialAccounts.jsx'
import ProfileEdit from './pages/profileEdit/ProfileEdit.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='' element = {<LandingPage/>}/>
    <Route path='login' element = {<SignIn/>}/>
    <Route path='signup' element ={<Register/>}/>
    <Route path='profile' element ={<ProfileDetails/>}/>
    <Route path='dashboard' element = {<DashBoard />}/>
    <Route path='links' element = {<Links/>}/>
    <Route path='social' element = {<SocialAccounts/>}/>
    <Route path='edit' element = {<ProfileEdit/>}/>
    </Route>

  ))


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ProfileProvider>
    <RouterProvider router={router} />
    </ProfileProvider>
  </StrictMode>,
)
