import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Submitted:', formData);
      // Handle form submission (e.g., call API)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <span className="inline-block text-3xl font-bold">🔗</span>
          <h2 className="text-2xl font-semibold">Create a new account</h2>
          <p className="mt-2 text-sm">
            Or{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              sign in to your account
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Register
          </button>
        </form>
        <div className="mt-6">
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 flex items-center justify-center mb-3">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-5 w-5 mr-2" />
            Login with Google
          </button>
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <img src="https://www.svgrepo.com/show/448234/github.svg" alt="GitHub" className="h-5 w-5 mr-2" />
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
