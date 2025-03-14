import { useState } from 'react'
import UserServices from '../../services/api'
import AppBarMenu from '../../components/AppBar'
import BasicModal from '../../components/Modal'
import MyForm from '../../components/Form/MyForm'
import {
	AccountCircle,
	EmailRounded,
	NumbersRounded,
	PasswordRounded,
} from '@mui/icons-material'
import { Container } from '@mui/material'

const AddUser = () => {
	const [modalMsg, setModalMsg] = useState('')
	const [modalTitle, setModalTitle] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		age: '',
		email: '',
		password: '',
	})
	const api = new UserServices()

	const lstFields = [
		{
			id: 'input-with-icon-textfield-name',
			label: 'Name',
			name: 'name',
			type: 'text',
			startAdornment: <AccountCircle />,
		},
		{
			id: 'input-with-icon-textfield-email',
			label: 'Email',
			name: 'email',
			type: 'email',
			startAdornment: <EmailRounded />,
		},
		{
			id: 'input-with-icon-textfield-number',
			label: 'Age',
			name: 'age',
			type: 'number',
			startAdornment: <NumbersRounded />,
		},
		{
			id: 'input-with-icon-textfield-password',
			label: 'Password',
			name: 'password',
			type: 'password',
			startAdornment: <PasswordRounded />,
		},
	]

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setModalMsg(null)
	}

	const handleAddUser = async () => {
		await api
			.createNewUser(formData)
			.then(() => {
				setModalTitle('Success')
				setModalMsg(`User created successfully!`)
				setIsModalOpen(true)
			})
			.catch((error) => {
				setModalTitle('Error')
				setModalMsg(error.response ? error.response.data.message : error.message)
				setIsModalOpen(true)
			})
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<>
			<BasicModal
				open={isModalOpen}
				onClose={handleCloseModal}
				title={modalTitle}
				body={modalMsg}
			/>
			<AppBarMenu />
			<Container maxWidth='sm'>
				<MyForm
					lstFields={lstFields}
					submitFunc={handleAddUser}
					fieldFunc={handleChange}
				/>
			</Container>
		</>
	)
}

export default AddUser
