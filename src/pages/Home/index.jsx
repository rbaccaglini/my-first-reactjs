import { useEffect, useState } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import UserServices from '../../services/api'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input'
import Button from '../../components/button'
import UserCard from '../../components/usercard'
import ErrorBoundary from '../../components/errorBoundary'

function Home() {
	const api = new UserServices()
	const navigate = useNavigate()

	const [users, setUsers] = useState([])
	const [errMessage, setErrMessage] = useState('')
	const [formData, setFormData] = useState([
		{
			name: '',
			age: '',
			email: '',
			password: '',
		},
	])

	async function getUsers() {
		const usersFromApi = await api.getUsers()
		setUsers(usersFromApi.data)
	}

	async function deleteUser(id) {
		await api
			.deleteUser(id)
			.then(() => {
				getUsers()
				setErrMessage('')
			})
			.catch((error) => {
				console.log(error)
			})
	}

	async function createUser() {
		setErrMessage('')
		await api
			.createNewUser(formData)
			.then(() => {
				getUsers()
				setErrMessage('')
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
		setFormData({ ...formData, [name]: value })
	}

	function logout() {
		api.logout()
		navigate('/login')
		return null
	}

	const formFields = [
		{
			placeholder: 'Nome',
			name: 'name',
			type: 'text',
			value: formData.name,
			func: handleLoginChange,
		},
		{
			placeholder: 'Idade',
			name: 'age',
			type: 'number',
			value: formData.age,
			func: handleLoginChange,
		},
		{
			placeholder: 'Email',
			name: 'email',
			type: 'email',
			value: formData.email,
			func: handleLoginChange,
		},
		{
			placeholder: 'Senha',
			name: 'password',
			type: 'password',
			value: formData.password,
			func: handleLoginChange,
		},
	]

	return (
		<div className='container'>
			<div className='left'>
				<form className='form-inside'>
					<h1>Cadastro de Usuários</h1>
					<ErrorBoundary>
						<Input fields={formFields} />

						<Button
							type='button'
							label='Cadastrar'
							func={createUser}
						/>

						<Button
							type='button'
							label='Sair'
							func={logout}
							cssName='logout-bt'
						/>
					</ErrorBoundary>
					{errMessage == '' ? '' : <div className='error'>{errMessage}</div>}
				</form>
			</div>

			<div className='right'>
				<UserCard
					users={users}
					func={deleteUser}
					img={Trash}
				/>
			</div>
		</div>
	)
}

export default Home
