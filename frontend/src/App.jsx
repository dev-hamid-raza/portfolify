
import Navbar from './components/header/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'

function App() {


  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

// <div className="app">
//     {/* <LandingPage /> */}
//     {/* <LoginForm /> */}
//     {/* <SignUpForm /> */}
//     {/* <Header /> */}
//     {/* <Register /> */}
//     {/* <SignIn /> */}
//     {/* <ProfileDetails /> */}
    
// </div>
export default App
