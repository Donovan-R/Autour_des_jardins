import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAPI = ({ token, children, user }) => {
  if (user.firstname !== 'donovan' && user.lastname !== 'rivière') {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRouteAPI;
