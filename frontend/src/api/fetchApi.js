// api/fetchProfile.js
import axios from 'axios';

export const fetchProfileData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/users/profile', {
      withCredentials: true,
    });
    console.log('this is data',response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};
