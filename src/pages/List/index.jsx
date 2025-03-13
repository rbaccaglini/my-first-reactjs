import { useState, useEffect } from 'react'
import {
	Box,
	TextField,
	Button,
	Typography,
	Card,
	CardContent,
	CardActions,
	IconButton,
	Grid2 as Grid,
} from '@mui/material'
import { Delete, Edit, Search } from '@mui/icons-material'

import UserServices from '../../services/api'
import Header from '../../components/internalHeader'

const List = () => {
	const api = new UserServices()

	const [searchEmail, setSearchEmail] = useState('')
	const [formData, setFormData] = useState({
		name: '',
		age: '',
		email: '',
		password: '',
	})
	const [users, setUsers] = useState([])
	const [errMessage, setErrMessage] = useState('')

	const handleAddUser = async () => {
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

	const handleDeleteUser = async (id) => {
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

	const handleEditUser = (id) => {
		const userToEdit = users.find((user) => user.id === id)
		if (userToEdit) {
			setFormData(userToEdit)
			setUsers(users.filter((user) => user.id !== id))
		}
	}

	const getUsers = async () => {
		const usersFromApi = await api.getUsers()
		setUsers(usersFromApi.data)
	}

	const getUserByEmail = async (email) => {
		if (email == '') {
			getUsers()
			return
		}

		console.log(email)

		const user = await api.getUserByEmail(email)
		setUsers(user.data)
		if (user.status !== 200) {
			setErrMessage('Usuário não encontrado')
		}
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<div>
			{/* Header */}
			<Header />

			<Grid
				container
				spacing={2}
				sx={{ padding: 2 }}
			>
				{/* Left Side: Form */}
				<Grid
					item
					size={{ xs: 12, md: 3 }}
				>
					<Typography
						variant='h6'
						gutterBottom
					>
						Novo Usuário
					</Typography>
					<TextField
						fullWidth
						label='Nome'
						type='text'
						variant='outlined'
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						sx={{ marginBottom: 2 }}
					/>
					<TextField
						fullWidth
						label='Idade'
						type='number'
						variant='outlined'
						value={formData.age}
						onChange={(e) => setFormData({ ...formData, age: e.target.value })}
						sx={{ marginBottom: 2 }}
					/>
					<TextField
						fullWidth
						label='Email'
						type='email'
						variant='outlined'
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						sx={{ marginBottom: 2 }}
					/>
					<TextField
						fullWidth
						label='Senha'
						type='password'
						variant='outlined'
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
						sx={{ marginBottom: 2 }}
					/>
					<Button
						variant='contained'
						color='primary'
						onClick={handleAddUser}
					>
						Adicionar
					</Button>
					<Typography
						variant='h6'
						gutterBottom
					>
						{errMessage}
					</Typography>
				</Grid>

				{/* Right Side: User List */}
				<Grid
					item
					size={{ xs: 12, md: 9 }}
				>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						width='100%'
						sx={{
							flexDirection: 'row', // Permite empilhar os elementos verticalmente
							alignItems: 'stretch', // Estica os elementos horizontalmente
						}}
					>
						{/* Busca por e-mail */}
						<Typography
							variant='h6'
							gutterBottom
						>
							Lista de Usuários ({users.length})
						</Typography>
						<Box
							display='flex'
							alignItems='center'
						>
							<TextField
								label='Buscar por e-mail'
								variant='outlined'
								size='small'
								value={searchEmail}
								onChange={(e) => setSearchEmail(e.target.value)}
								sx={{ marginRight: 2 }}
							/>
							<IconButton
								color='warning'
								onClick={() => getUserByEmail(searchEmail)}
							>
								<Search />
							</IconButton>
						</Box>
					</Box>
					{users.map((user) => (
						<Card
							key={user.id}
							sx={{ marginBottom: 2 }}
						>
							<CardContent>
								<Typography variant='body1'>Nome: {user.name}</Typography>
								<Typography variant='body1'>Idade: {user.age}</Typography>
								<Typography variant='body1'>Email: {user.email}</Typography>
							</CardContent>
							<CardActions>
								<IconButton
									color='primary'
									onClick={() => handleEditUser(user.id)}
								>
									<Edit />
								</IconButton>
								<IconButton
									color='secondary'
									onClick={() => handleDeleteUser(user.id)}
								>
									<Delete />
								</IconButton>
							</CardActions>
						</Card>
					))}
				</Grid>
			</Grid>
		</div>
	)
}

export default List
