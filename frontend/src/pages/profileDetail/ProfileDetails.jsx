import React, { useState } from 'react';
import { useProfile } from '../../utils/profileContext';

const ProfileDetails = () => {

  const { profile, updateProfile } = useProfile()
  const [formData, setFormData] = useState(profile)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTag = (e, field) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setFormData({
        ...formData,
        [field]: [...formData[field], e.target.value],
      });
      e.target.value = '';
    }
  };

  const handleDeleteTag = (tag, field) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== tag),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    updateProfile(formData);
  };
 console.log(formData)
  return (
    <div className='bg-primary-50'>
    <div className=' w-[100%] bg-white py-4 px-7 border-b'>
      <h2 className="text-2xl font-semibold  text-text-400">Profile Details</h2>
    </div>
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* Profile Section */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-text-400">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="p-6 bg-white rounded-lg shadow-md space-y-7">
              <h3 className="text-lg font-medium ">Basic Information</h3>
              <div className="mb-4 flex flex-col md:flex-row justify-center items-center gap-7">
                <div className="mt-1 w-[100%] md:w-[50%] h-32 flex items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-md  cursor-pointer bg-primary-100 hover:bg-primary-50">
                <label
                  htmlFor="file-upload"
                  className=" cursor-pointer "
                >
                  <p className="mb-2 text-[0.9rem] md:[1rem] text-black/70">
                    <strong >Drag and drop an image</strong>, or
                  </p>
                  <span className='underline text-classic_blue-600'>Browse</span>
                  <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) =>
                  setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0]) })
                  }
              />
                </label>
                </div>
                <div className='w-[100%] md:w-[50%]'>
                {formData.avatar && (
                  <img src={formData.avatar} 
                    alt='picture'
                    className='w-[200px] h-[200px]'
                    />
              )}
                </div>
              </div>

              {/* Nickname */}
              <div className=" ">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 p-2 outline-none  block w-full border border-gray-300 rounded-md focus:shadow-sm   sm:text-sm"
                />
                <p className="text-sm text-gray-500 mt-2">Your URL will look like: <span className='text-classic_blue-600'>  https://folio/{formData.username}</span></p>
              </div>

              {/* Tagline */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                />
              </div>

              {/* Bio */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="mt-1 block p-2  outline-none w-full border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  rows="4"
                ></textarea>
              </div>

              {/* Template Dropdown */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Template</label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 outline-none  border border-gray-300 rounded-md shadow-sm   sm:text-sm"
                >
                  <option>Delta</option>
                  <option>Gamma</option>
                  <option>Omega</option>
                </select>
              </div>

              {/* Resume Template */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Resume Template</label>
                <select
                  name="resumeTemplate"
                  value={formData.resumeTemplate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full outline-none p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                >
                  <option>Basic</option>
                  <option>Professional</option>
                  <option>Creative</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  You can configure your resume settings{' '}
                  <a href="#" className="text-classic_blue-600 hover:underline">
                    here
                  </a>
                </p>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-classic_blue-900 hover:bg-classic_blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classic_blue-800"
              >
                Update
              </button>
            </div>
          </div>

          {/* Right Column - Mobile Preview */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="border w-64 h-128 shadow-md rounded-lg overflow-hidden">
              {/* Phone Preview */}
              <iframe
                title="Profile Preview"
                className="w-full h-full"
                src={`https://folio.com/preview?nickname=${formData.username}&template=${formData.template}`}
              ></iframe>
            </div>
          </div>
        </div>
      </form>

      {/* Additional Sections (Skills, Stack, Hobbies, Languages) */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Skills</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add skill and press 'Enter'"
              onKeyDown={(e) => handleAddTag(e, 'skills')}
              className="mt-1 block p-2 outline-none w-full border border-gray-300 rounded-md shadow-sm   sm:text-sm"
            />
          </div>
          <div className="flex flex-wrap">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm flex items-center space-x-2 mr-2 mb-2"
              >
                <span>{skill}</span>
                <button onClick={() => handleDeleteTag(skill, 'skills')} className="text-red-600">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Stack</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add stack and press 'Enter'"
              onKeyDown={(e) => handleAddTag(e, 'stack')}
              className="mt-1 block p-2 outline-none w-full border border-gray-300 rounded-md focus:shadow-sm  sm:text-sm"
            />
          </div>
          <div className="flex flex-wrap">
            {formData.stack.map((stack, index) => (
              <div
                key={index}
                className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm flex items-center space-x-2 mr-2 mb-2"
              >
                <span>{stack}</span>
                <button onClick={() => handleDeleteTag(stack, 'stack')} className="text-red-600">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Hobbies</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add hobby and press 'Enter'"
              onKeyDown={(e) => handleAddTag(e, 'hobbies')}
              className="mt-1 block p-2 outline-none w-full border border-gray-300 rounded-md shadow-sm  sm:text-sm"
            />
          </div>
          <div className="flex flex-wrap">
            {formData.hobbies.map((hobby, index) => (
              <div
                key={index}
                className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm flex items-center space-x-2 mr-2 mb-2"
              >
                <span>{hobby}</span>
                <button onClick={() => handleDeleteTag(hobby, 'hobbies')} className="text-red-600">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Languages</h3>
          <div className="mb-4">
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="mt-1 block p-2  outline-none w-full border border-gray-300 rounded-md shadow-sm  sm:text-sm"
            >
              <option selected disabled>Select a language</option>
              <option>English</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfileDetails;
