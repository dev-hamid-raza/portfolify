import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    email: '',
    fullName:"",
    password: "",
    avatar : "",
    username : "",
    tagline: "",
    bio: "",
    template: "",
    resumeTemplate : "",
    skills: [],
    stack: [],
    hobbies: [],
    language: "",
    links: [],
    portfolio: "",
    socialLinks: {
        facebook: ''
    }
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
    
  })
  const updateProfile = (newProfileData) => {
    setProfile((prev) => ({ ...prev, ...newProfileData }))
  }

// Fetch profile data from the backend on component mount
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/profile', { withCredentials: true }) // Adjust endpoint as needed
      setProfile(response.data.data)
    } catch (error) {
      console.error('Error fetching profile data:', error)
    }
  }

  fetchProfile()
}, [])

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}
