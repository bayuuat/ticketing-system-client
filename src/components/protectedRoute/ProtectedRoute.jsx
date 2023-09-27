import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import validateToken from '@/components/protectedRoute/validateToken';

const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = Cookies.get('access_token');
    
    if (!token) {
      setIsChecking(false);
      return;
    }

    validateToken(token).then(isTokenValid => {
      setIsValid(isTokenValid);
      setIsChecking(false);
    });
  }, []);

  if (isChecking) {
    return null;
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;