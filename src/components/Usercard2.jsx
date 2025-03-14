import { Delete } from '@mui/icons-material'
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import Proptypes from 'prop-types'

const UserCard2 = ({ users, func = {} }) => {
	return (
		<Grid
			container
			spacing={2}
			sx={{ padding: 2 }}
		>
			{users.map((user) => (
				<Grid
					item
					key={user.id}
					size={{ xs: 12, md: 3 }}
				>
					<Card key={user.id}>
						<CardContent>
							<Typography
								variant='h5'
								component='div'
							>
								{user.name}
							</Typography>
							<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
								Age: {user.age}
							</Typography>
							<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
								{user.email}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size='small'
								onClick={() => func(user.id)}
							>
								<Delete />
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}

UserCard2.propTypes = {
	users: Proptypes.arrayOf(
		Proptypes.shape({
			name: Proptypes.string.isRequired,
			age: Proptypes.number.isRequired,
			email: Proptypes.string,
			id: Proptypes.string,
		}),
	).isRequired,
	func: Proptypes.func.isRequired,
}

export default UserCard2
