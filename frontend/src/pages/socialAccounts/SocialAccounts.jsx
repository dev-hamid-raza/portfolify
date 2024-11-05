import React , {useState}from 'react'
import { useProfile } from '../../utils/profileContext';
import axios from 'axios';

function SocialAccounts() {
    const { profile, updateProfile, loading } = useProfile()
    if(loading) return <p>loading...</p>
    const [formData, setFormData] = useState(profile)
    console.log('this is from social links', formData.socialLinks)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks, // Preserve existing links
        [name]: value, // Update only the relevant link
      },
    });
  };

  

  const handleSubmit = async (e) => {
    console.log('THis is running')
    e.preventDefault();
    // Handle form submission
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/social-links",
        {twitter: formData.socialLinks.twitter, github: formData.socialLinks.github, linkedIn: formData.socialLinks.linkedIn},
        {
          withCredentials: true,
        }
      );
      updateProfile(response.data.data);
    } catch (err) {
      console.log(err?.response?.data?.message || "Unable to update");
    }
  };
  console.log(formData)

    return (
      <div className='bg-primary-50'>
        <div className=' w-[100%] bg-white py-4 px-7 border-b'>
          <h2 className="text-2xl font-semibold  text-text-400">Social Profiles</h2>
        </div>
        <div className="p-8 max-w-7xl mx-auto flex flex-row">
          <div className='w-[100%] md:w-[65%] text-text-400'>
            <form onSubmit={handleSubmit} >
            <div className="p-6 bg-white rounded-lg shadow-md space-y-7">
            <div >
              <h3 className='font-semibold text-xl'>Profile  Information</h3>
              <p className='text-sm'>Add all your social media profiles here</p>
            </div>
              {/* LinkedIn */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input
                  type="text"
                  name="linkedIn"
                  value={formData.socialLinks.linkedIn}
                  onChange={handleInputChange}
                  placeholder='http://www.linknedin.com/in/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
              {/* Twitter */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder='http://www.twitter.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
              
                
                {/* GitHub */}
                <div className="">
                <label className="block text-sm font-medium text-gray-700">GitHub</label>
                <input
                  type="text"
                  name="github"
                  value={formData.socialLinks.github}
                  onChange={handleInputChange}
                  placeholder='http://www.github.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                
                
                
                {/* update button */}
                <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-classic_blue-900 hover:bg-classic_blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classic_blue-800"
              >
                Update
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default SocialAccounts
