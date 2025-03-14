import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Proptypes from 'prop-types'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const BasicModal = ({ open, onClose, title, body }) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
					>
						{title}
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 2 }}
					>
						{body}
					</Typography>
				</Box>
			</Modal>
		</div>
	)
}

BasicModal.propTypes = {
	open: Proptypes.bool.isRequired,
	onClose: Proptypes.func.isRequired,
	title: Proptypes.string.isRequired,
	body: Proptypes.string.isRequired,
}

export default BasicModal
