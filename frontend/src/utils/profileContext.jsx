import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { fetchProfileData } from '../api/fetchApi'
const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {

  const [loading,setLoading] =  useState(null)
  const [profile, setProfile] = useState(fetchProfileData())//{
    // email: '',
    // fullName:"",
    // password: "",
    // avatar : "",
    // username : "",
    // tagline: "",
    // bio: "",
    // template: "",
    // resumeTemplate : "",
    // skills: [],
    // stack: [],
    // hobbies: [],
    // language: "",
    // links: [],
    // portfolio: "",
    // socialLinks: {     
    // }
    // name:"",
    // fullName:"",
    // password: "",
    // profilePicture : "",
    // username : "",
    // tagline: "",
    // bio: "",
    // template: "",
    // resumeTemplate : "",
    // skills: [],
    // stack: [],
    // hobbies: [],
    // language: "",
    // links: [],
    // portfolio: "",
    // socialLinks: {
    //     linkedIn: "", twitter: "", facebook: "", instagram: "", github:"", youtube: "", dribble: "", behance:"", tiktok:"", printerest:"", snapchat:"", raddit:"", tumblr:"", spotify:"", soundCloud:""
    // }
    
 // })
  const updateProfile = (newProfileData) => {
    setProfile((prev) => ({ ...prev, ...newProfileData }))
  }

// Fetch profile data from the backend on component mount
useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/api/v1/users/profile', { withCredentials: true }) // Adjust endpoint as needed
      setProfile(response.data.data)
      console.log('this is profile',profile)
    } catch (error) {
      console.error('Error fetching profile data:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchProfile()
}, [])

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  )
}
