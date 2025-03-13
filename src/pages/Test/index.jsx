import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	...theme.applyStyles('dark', {
		backgroundColor: '#1A2027',
	}),
}))

export default function BasicGrid() {
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{Array.from(Array(6)).map((_, index) => (
				<Grid
					key={index}
					size={{ xs: 2, sm: 4, md: 4 }}
				>
					<Item>{index + 1}</Item>
				</Grid>
			))}
		</Grid>
	)
}
