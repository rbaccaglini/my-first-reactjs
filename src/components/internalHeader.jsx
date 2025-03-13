import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import UserServices from '../services/api'

const Header = () => {
	const api = new UserServices()
	const navigate = useNavigate()

	const logout = () => {
		console.log('logout')
		api.logout()
		navigate('/')
		return null
	}

	return (
		<AppBar position='static'>
			<Toolbar
				sx={{
					flexDirection: 'column',
					alignItems: 'stretch',
				}}
				className='test-header'
			>
				{/* Barra de busca e botão "Sair" */}
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					width='100%'
				>
					{/* Título */}
					<Typography
						variant='h6'
						align='left'
						className='header-title'
					>
						Sistema de Usuários
					</Typography>

					{/* Botão "Sair" */}
					<Button
						variant='contained'
						color='error'
						onClick={logout}
					>
						Sair
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
