import Proptypes from 'prop-types'

import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Visibility, VisibilityOff, SendRounded } from '@mui/icons-material'
import { Button, Grid2, IconButton } from '@mui/material'
import { useState } from 'react'

const MyForm = ({ lstFields, submitFunc, fieldFunc }) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
		setShowPassword((show) => !show)
	}
	const handleMouseUpPassword = (event) => event.preventDefault()

	const passwordFieldType = showPassword ? 'text' : 'password'

	return (
		<Grid2
			container
			spacing={2}
			sx={{ padding: 2 }}
		>
			{lstFields.map((field) => (
				<Grid2
					size={12}
					key={field.id}
				>
					<TextField
						type={field.type === 'password' ? passwordFieldType : field.type}
						label={field.label}
						name={field.name}
						fullWidth
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position='start'>
										{field.startAdornment}
									</InputAdornment>
								),
								endAdornment: field.type === 'password' && (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											onMouseUp={handleMouseUpPassword}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
						variant='standard'
						onChange={(e) => fieldFunc(e, field.id)}
					/>
				</Grid2>
			))}

			<Grid2 size={12}>
				<Button
					variant='contained'
					endIcon={<SendRounded />}
					fullWidth
					onClick={submitFunc}
				>
					Send
				</Button>
			</Grid2>
		</Grid2>
	)
}

MyForm.propTypes = {
	lstFields: Proptypes.arrayOf(
		Proptypes.shape({
			id: Proptypes.string.isRequired,
			name: Proptypes.string.isRequired,
			label: Proptypes.string.isRequired,
			type: Proptypes.string,
			startAdornment: Proptypes.element,
		}),
	).isRequired,
	submitFunc: Proptypes.func.isRequired,
	fieldFunc: Proptypes.func,
}

export default MyForm
