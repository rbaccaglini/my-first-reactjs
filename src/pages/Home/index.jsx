import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import UserServices from '../../services/api'

function Home() {

  const api = new UserServices()

  const [users, setUsers] = useState([])
  const [errMessage, setErrMessage] = useState("")
  const [formData, setForm] = useState([{
    name: "",
    age: "",
    email: "",
    password: ""
  }])

  async function getUsers() {
    const usersFromApi = (await api.getUsers())
    setUsers(usersFromApi.data)
  }

  async function deleteUser(id) {
    await api.deleteUser(id)
      .then((response) => {
        getUsers()
        setErrMessage("")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function createUser() {
    setErrMessage("")
    await api.createNewUser(formData)
      .then((response) => {
        getUsers()
        setErrMessage("")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  function handleLoginChange(e) {
    const { name, value } = e.target
    setForm({ ...formData, [name]: value })
  }

  const formFields = [
    {
      placeholder: "Nome",
      name: "name",
      type: "text",
      value: formData.name,
      func: handleLoginChange,
    },
    {
      placeholder: "Idade",
      name: "age",
      type: "number",
      value: formData.age,
      func: handleLoginChange,
    },
    {
      placeholder: "Email",
      name: "email",
      type: "email",
      value: formData.email,
      func: handleLoginChange,
    },
    {
      placeholder: "Senha",
      name: "password",
      type: "password",
      value: formData.password,
      func: handleLoginChange,
    }
  ]

  return (
    <div className='container'>
      <div className='left'>
        <form className="form-inside">
          <h1>Cadastro de Usuários</h1>
          {formFields.map((field, index) => (
            <input key={index} placeholder={field.placeholder} name={field.name} type={field.type} value={field.value} onChange={field.func} />
          ))}
          <button type="button" onClick={createUser} >Cadastrar</button>
          {errMessage == "" ? "" :
            <div className="error">
              {errMessage}
            </div>
          }
        </form>
      </div>

      <div className='right'>
        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{user.name}</span> </p>
              <p>Idade: <span>{user.age}</span> </p>
              <p>Email: <span>{user.email}</span> </p>
            </div>
            <button type="button" onClick={() => deleteUser(user.id)} >
              <img src={Trash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
