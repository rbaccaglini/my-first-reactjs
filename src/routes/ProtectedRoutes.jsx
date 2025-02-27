import UserServices from '../services/api'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const userService = new UserServices();

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = userService.usuarioAutenticado()
  console.log("Test: ", isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? children : null
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired
}

export default ProtectedRoutes;