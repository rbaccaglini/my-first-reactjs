import { useEffect, useState } from 'react'
import AppBarMenu from '../../components/AppBar'
import UserCard2 from '../../components/Usercard2'
import UserServices from '../../services/api'
import BasicModal from '../../components/Modal'

const Home = () => {
	// Variables
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const api = new UserServices()

	// Functions
	const getUsers = async () => {
		const usersFromApi = await api.getUsers()
		setUsers(usersFromApi.data)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setError(null)
	}

	const handleDeleteUser = async (id) => {
		await api
			.deleteUser(id)
			.then(() => {
				getUsers()
			})
			.catch((error) => {
				setError(`Error: ${error}`)
				setIsModalOpen(true)
			})
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<>
			<AppBarMenu />
			<UserCard2
				users={users}
				func={handleDeleteUser}
			/>
			<BasicModal
				open={isModalOpen}
				onClose={handleCloseModal}
				title='Erro teste'
				body={error}
			/>
		</>
	)
}

export default Home
