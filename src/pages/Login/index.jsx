import "./style.css"
import { FaUser, FaLock } from "react-icons/fa"
import { useState } from "react"
import api from '../../services/api'
import { useNavigate } from "react-router-dom"

function Login() {

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
    await api.post("/login", login)
      .then((response) => {
        setStatusCode(response.status)
        if (response.status == 200) {
          navigate("/home")
        }
      })
      .catch((error) => {
        setStatusCode(error.response.status)
      })
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>

        {formFields.map((field) => (
          <div className="input-field" key={field.name}>
            <input value={field.value} placeholder={field.placeholder} name={field.name} type={field.type} onChange={field.func} />
            {field.icon}
          </div>
        ))}

        <div className="recall-forget">
          <label>
            <input type="checkbox" /> Lembre de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit">Efetura Login</button>

        {statusCode == "" || statusCode == 200 ? ""
          : <div className="error-message">
            <p>Login inválido</p>
          </div>
        }

        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="#">Cadastre-se</a>
          </p>
        </div>

      </form>
    </div>
  )
}

export default Login
