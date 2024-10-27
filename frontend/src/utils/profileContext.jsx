import React, { createContext, useState, useContext } from 'react'

const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name:"",
    email:"",
    password: "iqra12",
    profilePicture : "",
    nickName : "",
    tagline: "this is a tagline",
    bio: "",
    template: "",
    resumeTemplate : "",
    skills: ["css"],
    stack: ["mern", "stack"],
    hobbies: [],
    language: "",
    links: [],
    portfolio: "https://folli.io/hamidraza",
    socialLinks: {
        linkedIn: "", twitter: "", facebook: "", instagram: "", github:"", youtube: "", dribble: "", behance:"", tiktok:"", printerest:"", snapchat:"", raddit:"", tumblr:"", spotify:"", soundCloud:""
    }
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
