import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/icons/google.svg"
import github from "../assets/icons/github.svg"
import axios from 'axios';


const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // Form validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      isValid = false;
      newErrors.email = 'Email is required';
    }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      isValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email: formData.email,
        password: formData.password,
      },{ withCredentials: true});
      console.log(response.status)
      if(response.status === 200) {
        console.log(response.data.data.user)
        navigate('/dashboard')
      }
      console.log('Form data submitted:', formData);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 sm:rounded-lg sm:shadow-lg max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-center text-2xl font-semibold">Sign in to your account</h2>
        <p className="text-center text-sm text-gray-500">
          Or{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            create a new account
          </Link>
        </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-classic_blue-900 text-white py-2 px-4 rounded-lg hover:bg-classic_blue-800 focus:outline-none"
          >
            Sign in
          </button>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <img src={google} alt="Google" className="h-5 w-5 mr-2" />
              Login with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <img src={github} alt="GitHub" className="h-5 w-5 mr-2" />
              Login with GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
