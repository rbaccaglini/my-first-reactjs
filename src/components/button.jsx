import Proptypes from 'prop-types'

const Button = ({ type = 'button', label = '', func = {}, cssName = '' }) => {
	return (
		<button
			type={type}
			className={cssName}
			onClick={func}
		>
			{label}
		</button>
	)
}

Button.propTypes = {
	type: Proptypes.string,
	label: Proptypes.string.isRequired,
	cssName: Proptypes.string,
	func: Proptypes.func.isRequired,
}

export default Button
