import React , {useState}from 'react'
import { useProfile } from '../../utils/profileContext';

function SocialAccounts() {
    const { profile, updateProfile } = useProfile()
    const [formData, setFormData] = useState(profile)
  
  
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

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    updateProfile(formData);
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
                  value={formData.linkedIn}
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
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder='http://www.twitter.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
              {/* Facebook */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder='http://www.facebook.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* Instagram */}
                <div className="">
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder='http://www.instagram.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* GitHub */}
                <div className="">
                <label className="block text-sm font-medium text-gray-700">GitHub</label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder='http://www.github.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* YouTube */}
                <div className="">
                <label className="block text-sm font-medium text-gray-700">YouTube</label>
                <input
                  type="text"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleInputChange}
                  placeholder='http://www.youtube.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* Dribbble */}
                <div className="">
                <label className="block text-sm font-medium text-gray-700">Dribble</label>
                <input
                  type="text"
                  name="dribble"
                  value={formData.dribble}
                  onChange={handleInputChange}
                  placeholder='http://www.dribble.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* Behance */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Behance</label>
                <input
                  type="text"
                  name="behance"
                  value={formData.behance}
                  onChange={handleInputChange}
                  placeholder='http://www.behance.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* TikTok */}
                <div className="">
                <label className="block text-sm font-medium text-gray-700">TikTok</label>
                <input
                  type="text"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleInputChange}
                  placeholder='http://www.tiktok.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* Printerest */}
                <div className="">
                <label className="block text-sm font-medium text-gray-700">Printerest</label>
                <input
                  type="text"
                  name="printerest"
                  value={formData.printerest}
                  onChange={handleInputChange}
                  placeholder='http://www.printerest.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* SnapChat */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Snapchat</label>
                <input
                  type="text"
                  name="snapchat"
                  value={formData.snapchat}
                  onChange={handleInputChange}
                  placeholder='http://www.printerest.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* Reddit */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Reddit</label>
                <input
                  type="text"
                  name="reddit"
                  value={formData.reddit}
                  onChange={handleInputChange}
                  placeholder='http://www.reddiit.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* Tumblr */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Tumblr</label>
                <input
                  type="text"
                  name="tumblr"
                  value={formData.tumblr}
                  onChange={handleInputChange}
                  placeholder='http://www.tumblrt.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* Spotify */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Spotify</label>
                <input
                  type="text"
                  name="spotify"
                  value={formData.spotify}
                  onChange={handleInputChange}
                  placeholder='http://www.spotify.com/sampleusername'
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
                {/* SoundCloud */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">SoundCloud</label>
                <input
                  type="text"
                  name="SoundCloud"
                  value={formData.soundCloud}
                  onChange={handleInputChange}
                  placeholder='http://www.soundCloud.com/sampleusername'
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
