import React , {useState}from 'react'
import { useProfile } from '../../utils/profileContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function Links() {
  
  const { profile, updateProfile } = useProfile()
  const [formData, setFormData] = useState(profile)




  const  handleSubmit = ()=>{

      if (url && text) {
        setFormData([...formData.links, { url, text, enabled: true }]);
      }
  }


  return (
    <div className='bg-primary-50'> 
      <div className=' w-[100%] bg-white py-4 px-7 border-b'>
        <h2 className="text-2xl font-semibold  text-text-400">Links</h2>
      </div>
      <div className="p-8 max-w-7xl mx-auto flex flex-row">
      <div className='w-[100%] md:w-[65%] text-text-400'>
            <form onSubmit={handleSubmit} >
            <div className="p-6 bg-white rounded-lg shadow-md space-y-7">
            <div >
              <h3 className='font-semibold text-xl'>Add Link</h3>
              <p className='text-sm'>Enter information and press "Add" button.</p>
            </div>
              {/* URL */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Url</label>
                <input
                  type="text"
                  name="url"
                  value=''
                  onChange=''
                  placeholder=''
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
              {/* text */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Text</label>
                <input
                  type="text"
                  name="text"
                  value=''
                  onChange=''
                  placeholder=''
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
              {/* Add button */}
              <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-classic_blue-900 hover:bg-classic_blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classic_blue-800"
              >
                Add Link
              </button>
            </div>
            </form>
        
      <div className="p-6 bg-white rounded-lg shadow-md mt-7 ">
        <h3 className="text-xl font-semibold">Links</h3>
        <p className="text-sm text-gray-500 mb-2">Currently defined links</p>

        {formData.links.map((link, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-100 rounded mb-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-500">⋮⋮</span>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {link.url}
              </a>
              <span>{link.text}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle Button */}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={link.enabled}
                  onChange={() => handleToggle(index)}
                  className="toggle-checkbox"
                />
                <span className="ml-2">Enabled</span>
              </label>
              {/* delete button */}
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} className="text-gray-400 " />
              </button>
              </div>

          </div>
          ))}
        </div>
        </div>
        </div>
    </div>
  )
}

export default Links
