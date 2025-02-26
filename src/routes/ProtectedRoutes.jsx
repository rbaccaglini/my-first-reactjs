import UserServices from '../services/api'
import { useNavigate } from 'react-router-dom';

const userService = new UserServices();

const ProtectedRoutes = ({ children }) => {

  const navigate = useNavigate();
  const usuarioAutenticado = userService.usuarioAutenticado()
  if (!usuarioAutenticado) {
    navigate('/login');
    return null;
  }
  return children;
}

export default ProtectedRoutes;