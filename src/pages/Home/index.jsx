import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const [errMessage, setErrMessage] = useState("")

  const refName = useRef()
  const refAge = useRef()
  const refEmail = useRef()
  const refPassword = useRef()

  async function getUsers() {
    const usersFromApi = (await api.get("/user"))
    setUsers(usersFromApi.data)
  }

  async function deleteUser(id) {
    await api.delete(`/user/${id}`)
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
    await api.post("/user", {
      name: refName.current.value,
      age: parseInt(refAge.current.value, 10),
      email: refEmail.current.value,
      password: refPassword.current.value
    })
      .then((response) => {
        getUsers()
        setErrMessage("")
      })
      .catch((error) => {
        setErrMessage(error.response.data.message)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <div className='left'>
        <form className="form-inside">
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Nome" name="nome" type="text" ref={refName} />
          <input placeholder="Idade" name="idade" type="number" ref={refAge} />
          <input placeholder="Email" name="email" type="email" ref={refEmail} />
          <input placeholder="Password" name="password" type="password" ref={refPassword} />
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
