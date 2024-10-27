import React , {useState}from 'react'
import { useProfile } from '../../utils/profileContext';



function ProfileEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const [password , setPassword] = useState('')
  const { profile, updateProfile } = useProfile()
  const [formData, setFormData] = useState(profile)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }) // State for password changes
  const [errors, setErrors] = useState({});

  

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData({ ...passwordData, [name]: value });
}

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission
  updateProfile(formData);
};

const validate = () => {
  const { currentPassword, newPassword, confirmPassword } = passwordData;
  let newErrors = {};

  if (currentPassword !== profile.password) {
    newErrors.currentPassword= 'Invalid current password';
  } 
  if(!newPassword){
    newErrors.newPassword = 'you have not entered the new password'
  }else if (newPassword.length < 6) {
    newErrors.newPassword = 'Password must be at least 6 characters';
  }
  if (confirmPassword !== newPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  return newErrors;
};



const submitPassword = (e)=>{
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  
  if (Object.keys(validationErrors).length === 0) {
    setFormData({ ...formData, password: passwordData.newPassword })
    updateProfile(formData);
    // Handle form submission (e.g., call API)
  } 
}


//validation for  of password on account deletion
const validatePassword = ()=>{
  let newErrors = {};
  if (password !== profile.password){
      newErrors.password= 'enter your correct password';
  }
  return newErrors;
}

const handleAccountDelete = (e)=>{
    e.preventDefault();
    const validationErrors = validatePassword();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsOpen(false);
      // Handle Account deletion
    }
}

console.log(formData)

  return (
    <div className='bg-primary-50'> 
      <div className=' w-[100%] bg-white py-4 px-7 border-b'>
        <h2 className="text-2xl font-semibold  text-text-400">Profile</h2>
      </div>
      <div className="px-8 pt-8 pb-4 max-w-7xl mx-auto">
      <div className='w-[100%]  text-text-400  '>
            <form onSubmit={handleSubmit} >
            <div className="p-6 bg-white rounded-lg shadow-md  ">
            <div className='w-[100%] md:w-[80%] space-y-7'>
            <div >
              <h3 className='font-semibold text-xl'>Profile Information</h3>
              <p className='text-sm'>Update your account's profile information and email address.</p>
            </div>
              {/* Name */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder=''
                  className="mt-1 p-2 block w-full outline-none border border-gray-300  rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
              {/* Email*/}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=''
                  className="mt-1 p-2 block w-full outline-none border border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm"
                />
              </div>
              {/* Add button */}
              <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-classic_blue-900 hover:bg-classic_blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classic_blue-800"
              >
                Update
              </button>
              </div>
            </div>
            </form>
          </div>
          
        </div>

        {/*======== password change ==========*/}
      <div className="px-8 py-4 max-w-7xl mx-auto ">
      <div className='w-[100%]  text-text-400 '>
            <form onSubmit={submitPassword} >
            <div className="p-6 bg-white rounded-lg shadow-md space-y-7">
            <div className=' w-[100%] md:w-[80%] space-y-7'>
            <div >
              <h3 className='font-semibold text-xl'>Update Password</h3>
              <p className='text-sm'>Ensure your account is using a long, random password to stay secure.</p>
            </div>
              {/* current password */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder=''
                  className={`mt-1 p-2 block w-full outline-none border ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'} border-gray-300  rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm`}
                />
                {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
              </div>
              {/* new password */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder=''
                  className={`mt-1 p-2 block w-full outline-none border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm`}
                />
                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
              </div>
                {/* confirm password */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder=''
                  className={`mt-1 p-2 block w-full outline-none border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} border-gray-300 rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              
              {/* Add button */}
              <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-classic_blue-900 hover:bg-classic_blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classic_blue-800"
              >
                Update
              </button>
              </div>
            </div>
            </form>
          </div>
        </div>

        {/*=======Delete Account========= */}
        <div className="px-8 py-4 max-w-7xl mx-auto ">
          <div className='w-[100%]  text-text-400 '>
          <div className="p-6 bg-white rounded-lg shadow-md space-y-7">
            <div >
              <h3 className='font-semibold text-xl'>Delete Account</h3>
              <p className='text-sm'>After deleting your account, all data and resources are permanently removed. Enter your password to confirm deletion.</p>
            </div>
            <button className={`bg-classic_red-700 mr-2 rounded-2xl  text-primary-50 text-sm   font-bold   font-roboto 	px-8	sm:px-10 py-2 hover:bg-classic_red-600`}
            onClick={() => setIsOpen(true)}
			      >
              Delete Account
			      </button>
            </div>
          </div>
      </div>
      {/* delete account comfirmation */}
      <div className={` ${isOpen ? "flex" : "hidden"} w-full h-full  flex-row justify-center  bg-black/20 backdrop-blur-sm  fixed top-16 left-0 `}>

        <div className={`flex flex-col gap-4 p-7 w-[90%] h-[400px]  md:w-[50%] md:h-[300px] rounded-xl  absolute top-32    bg-blend-overlay bg-white border-[1px] shadow-md  text-text-400 `}>
            <div className=' space-y-2'>
            <h3 className='font-semibold text-xl'>
            Are you sure you want to delete your account?</h3>
            <p className='text-sm'>After deleting your account, all data and resources are permanently removed. Enter your password to confirm deletion.</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Enter your Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder=''
                  className={`mt-1 p-2 block w-full outline-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} border-gray-300  rounded-md hover:shadow-sm focus:shadow-sm  sm:text-sm`}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className=' flex flex-col md:flex-row md:justify-end items-center gap-4'>
            <button className={`bg-gray-300  md:w-fit w-full rounded-md  text-text-400 text-sm   font-bold   font-roboto 	px-8	sm:px-8 py-3 hover:bg-gray-400`}
            onClick={() => setIsOpen(false)}
			      >
              Cancel
			      </button>
            <button className={`bg-classic_red-700  md:w-fit w-full  rounded-md  text-primary-50 text-sm   font-bold   font-roboto 	px-8	sm:px-8 py-3 hover:bg-classic_red-600`}
            onClick={handleAccountDelete}
			      >
              Delete Account
			      </button>
            </div>

        </div>
        </div>
    </div>
  )
}

export default ProfileEdit
