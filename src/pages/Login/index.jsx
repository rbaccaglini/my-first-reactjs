import "./style.css"
import { FaUser, FaLock } from "react-icons/fa"
import { useState } from "react"
import UserServices from '../../services/api'
import { useNavigate } from "react-router-dom"
import Button from "../../components/button"
import Input from "../../components/input"
import ErrorBoundary from '../../components/errorBoundary'

function Login() {

  const api = new UserServices()
  const navigate = useNavigate()
  const [statusCode, setStatusCode] = useState("")
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  const formFields = [{
    type: "email",
    name: "email",
    value: login.email,
    placeholder: "Email",
    icon: <FaUser className="icon" />,
    func: handleLoginChange,
  }, {
    type: "password",
    name: "password",
    value: login.password,
    placeholder: "Password",
    icon: <FaLock className="icon" />,
    func: handleLoginChange,
  }]

  function handleLoginChange(e) {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }

  async function handleLogin(e) {
    e.preventDefault()
    setStatusCode("")
    const response = await api.login(login)
    setStatusCode(response)
    if (response == 200) {
      navigate("/home")
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <ErrorBoundary>
          <Input fields={formFields} />
        </ErrorBoundary>

        <div className="recall-forget">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
          <a href="/">Esqueceu a senha?</a>
        </div>

        <Button type="submit" label="Efetura Login !!" />

        {statusCode == "" || statusCode == 200 ? ""
          : <div className="error-message">
            <p>Login inválido</p>
          </div>
        }

        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="/">Cadastre-se</a>
          </p>
        </div>

      </form>
    </div>
  )
}

export default Login
