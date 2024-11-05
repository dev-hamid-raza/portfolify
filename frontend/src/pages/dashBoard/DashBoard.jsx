import React, { useEffect, useState } from "react";
import { useProfile } from '../../utils/profileContext';
import { Link } from "react-router-dom";

const DashBoard = () => {
  const { profile, updateProfile } = useProfile()
  
  // Dashboard rows for each profile field
  const fields = [
    { name: 'username', value: profile.username },
    { name: 'avatar', value: profile.avatar },
    // { name: 'Tagline', value: profile.tagline },
    { name: 'Bio', value: profile.bio },
    { name: 'Skills', value: profile.skills },
    { name: 'Stack', value: profile.stack },
    { name: 'Hobbies', value: profile.hobbies },
    { name: 'Links', value: profile.links },
    { name: 'Social Links', value: profile.socialLinks }
  ];

  // Function to check if field is filled or needs a fix
  const getStatus = (value) => {
    if(value === undefined) return false
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null && value !== '') return Object.values(value).some(
      (val) => (Array.isArray(val) ? val.length > 0 : val !== '' && val !== null)
    );
    return value  !== '';
  };

  // Function to generate status button
  const renderStatusButton = (status) => (
    <Link to="/profile"
      className={`px-3 py-1 rounded-full text-sm ${
        status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
      }`}
    >
      {status ? 'Passed' : 'Need Fix'}
    </Link>
  );


  return (
    <div className="bg-primary-50">
      <div className=' w-[100%] bg-white py-4 px-7 border-b'>
          <h2 className="text-2xl font-semibold  text-text-400">Dashboard</h2>
      </div>
      {/* Left Section */}
      <div className="p-8 max-w-7xl mx-auto flex flex-row">
        <div className='w-[100%] md:w-[60%] text-text-400'>

        <div className=" bg-primary-100 w-[100%] mb-7 p-6 rounded-lg border  ">
        <p>Your site is available here: <a href="#" className=" text-classic_blue-700">{profile.username}</a></p>
        {/* <p>Your resume: <a href="#">https://folli.io/ahmadrehmani/resume</a></p> */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md space-y-7">
        <div className="mt-4 w-[100%]">
        {fields.map((field, index) => {
          const status = getStatus(field.value);
          const count = Array.isArray(field.value) ? field.value.length : null;
          return (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <span className="font-medium ">{field.name} defined</span>
                {count !== null && (
                  <span className="ml-2 text-[0.6rem] text-white bg-classic_blue-900 py-1 px-2 rounded-full">{count}</span>
                )}
              </div>
              {renderStatusButton(status)}
            </div>
          );
        })}
        </div>
        </div>
      </div>
      </div>
      </div>
      )
      }

      export default DashBoard




      /*please understand this page carefully . this is a dashboard page which shows all the field names of the user profile  in these tabs . these tabs shows the status of  profile information fields that which field is filled by user and which is not .  in left side of tab there is field name and in right side there is a button if a field has some value entered by the user the button on right side will turn green and shows text (passed) in itself and if the field is empty then the button has red background and it has the value(Need fix) . we have no backend yet but we have created a context names as profileContext in this we created all the fields related to user profile . we will update the values of buttons by checking the fields either these are empty or filled. here we will check  the value of  field name given in tab by comparing with field name created in profile context. some fields of user profile are in the form of array with multiple inputs for these field there is a counter in particular tabs which count the multiple inputs that user enter in these array fields. please create a fully responsive front end of this page with all functionalities which i have  told you,   by using react js and tailwind css */