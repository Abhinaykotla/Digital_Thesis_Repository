import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
      sessionStorage.clear();

      window.location.href='/login';
  });

};

export default Logout;
