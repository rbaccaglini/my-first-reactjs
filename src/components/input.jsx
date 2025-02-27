import Proptypes from 'prop-types'

const Input = ({ fields }) => {
	return (
		<>
			{fields.map((field) => (
				<div
					className='input-field'
					key={JSON.stringify(field)}
				>
					<input
						type={field.type || 'text'}
						name={field.name || ''}
						value={field.value || ''}
						placeholder={field.placeholder || ''}
						onChange={field.func || (() => {})}
					/>
					{field.icon}
				</div>
			))}
		</>
	)
}

Input.propTypes = {
	fields: Proptypes.arrayOf(
		Proptypes.shape({
			type: Proptypes.string.isRequired,
			name: Proptypes.string.isRequired,
			value: Proptypes.oneOfType([Proptypes.string, Proptypes.number])
				.isRequired,
			placeholder: Proptypes.string,
			icon: Proptypes.element,
			func: Proptypes.func.isRequired,
		}),
	).isRequired,
}

export default Input
