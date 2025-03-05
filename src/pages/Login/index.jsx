import './style.css'
import { FaUser, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import UserServices from '../../services/api'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/loginForm'

const LOGIN_SUCCESS = 200
const LOGIN_ERROR_MESSAGE = 'Login inválido'

function Login() {
	const api = new UserServices()
	const navigate = useNavigate()
	const [statusCode, setStatusCode] = useState('')
	const [login, setLogin] = useState({
		email: '',
		password: '',
	})
	const formFields = [
		{
			type: 'email',
			name: 'email',
			value: login.email,
			placeholder: 'Email',
			icon: <FaUser className='icon' />,
			func: handleLoginChange,
		},
		{
			type: 'password',
			name: 'password',
			value: login.password,
			placeholder: 'Password',
			icon: <FaLock className='icon' />,
			func: handleLoginChange,
		},
	]

	function handleLoginChange(e) {
		const { name, value } = e.target
		setLogin({ ...login, [name]: value })
	}

	async function handleLogin(e) {
		e.preventDefault()
		setStatusCode('')

		if (!login.email || !login.password) {
			setStatusCode('Preencha todos os campos')
			return
		}
		try {
			const response = await api.login(login)
			setStatusCode(response)
			if (response == LOGIN_SUCCESS) {
				navigate('/list')
			}
		} catch (error) {
			setStatusCode('Erro ao tentar fazer login')
			console.log('Error: ', error)
		}
	}

	return (
		<div className='login-container'>
			<LoginForm
				formFields={formFields}
				handleLogin={handleLogin}
				statusCode={statusCode}
				LOGIN_SUCCESS={LOGIN_SUCCESS}
				LOGIN_ERROR_MESSAGE={LOGIN_ERROR_MESSAGE}
			/>
		</div>
	)
}

export default Login
