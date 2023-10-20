import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRouteCustomer = ({ children }) => {
  const token = Cookies.get('user_detail');
  
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteCustomer;