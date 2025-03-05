import Button from './button'
import Input from './input'
import ErrorBoundary from './errorBoundary'
import SignupLink from './signupLink'
import PropTypes from 'prop-types'

const LoginForm = ({
	formFields,
	handleLogin,
	statusCode,
	LOGIN_SUCCESS,
	LOGIN_ERROR_MESSAGE,
}) => {
	return (
		<form onSubmit={handleLogin}>
			<h1>Login</h1>
			<ErrorBoundary>
				<Input fields={formFields} />
			</ErrorBoundary>

			<div className='recall-forget'>
				<label>
					<input type='checkbox' /> Lembre de mim
				</label>
				<a href='/'>Esqueceu a senha?</a>
			</div>

			<Button
				type='submit'
				label='Efetuar Login !!'
			/>

			{statusCode && statusCode !== LOGIN_SUCCESS && (
				<div className='error-message'>
					<p>{statusCode === '' ? LOGIN_ERROR_MESSAGE : statusCode}</p>
				</div>
			)}

			<SignupLink />
		</form>
	)
}

LoginForm.propTypes = {
	formFields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			placeholder: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			func: PropTypes.func.isRequired,
		}),
	).isRequired,
	handleLogin: PropTypes.func.isRequired,
	statusCode: PropTypes.string,
	LOGIN_SUCCESS: PropTypes.number,
	LOGIN_ERROR_MESSAGE: PropTypes.string,
}

export default LoginForm
