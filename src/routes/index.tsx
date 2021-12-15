import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import App from './app.routes';
import Auth from './auth.routes';

const Routes: React.FC = () => {
  const { logged } = useAuth();
  
  return (
    <Router>
      { logged ? <App /> : <Auth /> }
    </Router>
  );
}
 
export default Routes;

