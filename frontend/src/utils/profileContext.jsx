import React, { createContext, useState, useContext } from 'react'

const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    email: '',
    fullName:"",
    password: "",
    avatar : "",
    username : "",
    // tagline: "",
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

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}
