import Input from './input'
import Button from './button'
import ErrorBoundary from './errorBoundary'
import PropTypes from 'prop-types'

const UserForm = ({ formFields, createUser, logout, errMessage = '' }) => {
	return (
		<form className='form-inside'>
			<h1>Cadastro de Usuários</h1>
			<ErrorBoundary>
				<Input fields={formFields} />

				<Button
					type='button'
					label='Cadastrar'
					func={createUser}
				/>
				<Button
					type='button'
					label='Sair'
					func={logout}
					cssName='logout-bt'
				/>
			</ErrorBoundary>
			{errMessage && <div className='error'>{errMessage}</div>}
		</form>
	)
}

UserForm.propTypes = {
	formFields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			placeholder: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			func: PropTypes.func.isRequired,
		}),
	).isRequired,
	createUser: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	errMessage: PropTypes.string,
}

export default UserForm
