import React, { useState } from 'react';

const ProfileDetails = () => {
  const [formData, setFormData] = useState({
    nickname: 'hamidraza',
    tagline: '',
    bio: '',
    template: 'Delta',
    resumeTemplate: 'Basic',
    skills: ['CSS'],
    stack: [],
    hobbies: [],
    languages: '',
  });

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
    console.log('Profile data submitted:', formData);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Profile Details</h2>
      
      {/* Profile Section */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-32 cursor-pointer">
                  <span>Click to upload or drag and drop</span>
                </div>
              </div>

              {/* Nickname */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="text-sm text-gray-500 mt-2">Your URL will look like: https://folio/{formData.nickname}</p>
              </div>

              {/* Tagline */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows="4"
                ></textarea>
              </div>

              {/* Template Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Template</label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Delta</option>
                  <option>Gamma</option>
                  <option>Omega</option>
                </select>
              </div>

              {/* Resume Template */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Resume Template</label>
                <select
                  name="resumeTemplate"
                  value={formData.resumeTemplate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Basic</option>
                  <option>Professional</option>
                  <option>Creative</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  You can configure your resume settings{' '}
                  <a href="#" className="text-indigo-600 hover:underline">
                    here
                  </a>
                </p>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                src={`https://folio.com/preview?nickname=${formData.nickname}&template=${formData.template}`}
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Select a language</option>
              <option>English</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
