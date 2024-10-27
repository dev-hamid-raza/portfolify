// ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ redirectTo, children, publicOnly = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('object')
        const response = await axios.get('http://localhost:8000/api/v1/users/check-auth', {
          withCredentials: true,
        });

        setIsAuthenticated(response.status === 200);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated !== null) {
      if (isAuthenticated && publicOnly) {
        navigate('/dashboard'); // Redirect to dashboard if logged in and trying to access public-only page
      } else if (!isAuthenticated && !publicOnly) {
        navigate(redirectTo || '/'); // Redirect to login if not authenticated
      }
    }
  }, [isAuthenticated, navigate, redirectTo, publicOnly]);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return (isAuthenticated && !publicOnly) || (!isAuthenticated && publicOnly) ? children : null;
};

export default ProtectedRoute;
