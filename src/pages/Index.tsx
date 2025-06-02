
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to dashboard as the main landing page
  React.useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return null;
};

export default Index;
