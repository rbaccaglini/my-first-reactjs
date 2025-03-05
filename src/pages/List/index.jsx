import { TopHeader, Container, Left, Right, TopContainer, Image } from './style'
import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Trash from '../../assets/trash.svg'
import Find from '../../assets/find_search_icon.svg'
import UserServices from '../../services/api'
import UserCard from '../../components/usercard'
import UserForm from '../../components/userForm'

function List() {
	const api = new UserServices()
	const navigate = useNavigate()

	const [errorFind, setErrorFind] = useState('')
	const [find, setFind] = useState('')
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

	async function getUsers() {
		const usersFromApi = await api.getUsers()
		setUsers(usersFromApi.data)
	}

	async function getUserByEmail(email) {
		if (email == '') {
			getUsers()
			return
		}

		const user = await api.getUserByEmail(email)
		setUsers(user.data)
		if (user.status !== 200) {
			setErrorFind('Usuário não encontrado')
		}
	}

	useEffect(() => {
		getUsers()
	}, [])

	async function deleteUser(id) {
		await api
			.deleteUser(id)
			.then(() => {
				getUsers()
				setErrMessage('')
			})
			.catch((error) => {
				setErrMessage(error)
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
				setErrMessage(error.response.data.message)
			})
	}

	function handleLoginChange(e) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	function handleFindChange(e) {
		setFind(e.target.value)
		console.log(find)
	}

	function logout() {
		api.logout()
		navigate('/login')
		return null
	}

	return (
		<>
			<TopHeader>
				<TopContainer>
					<h3>Consulta de Usuários</h3>
					<input
						type='text'
						placeholder='Pesquisar email'
						name='find-email'
						value={find}
						onChange={handleFindChange}
					/>
					<button
						type='button'
						onClick={() => getUserByEmail(find)}
					>
						<Image
							src={Find}
							alt=''
						/>
					</button>
				</TopContainer>
			</TopHeader>
			<Container>
				<Left>
					<UserForm
						formFields={formFields}
						createUser={createUser}
						logout={logout}
						errMessage={errMessage}
					/>
				</Left>
				<Right>
					{errorFind == '' ? (
						<UserCard
							users={users}
							func={deleteUser}
							img={Trash}
						/>
					) : (
						<div className='error'>{errorFind}</div>
					)}
				</Right>
			</Container>
		</>
	)
}

export default List
