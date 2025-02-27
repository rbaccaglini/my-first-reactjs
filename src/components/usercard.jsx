import Proptypes from 'prop-types'

const UserCard = ({ users, func = {}, img = '' }) => {
	return (
		<>
			{users.map((user) => (
				<div
					key={user.id}
					className='card'
				>
					<div>
						<p>
							Nome: <span>{user.name}</span>{' '}
						</p>
						<p>
							Idade: <span>{user.age}</span>{' '}
						</p>
						<p>
							Email: <span>{user.email}</span>{' '}
						</p>
					</div>
					<button
						type='button'
						onClick={() => func(user.id)}
					>
						<img
							src={img}
							alt=''
						/>
					</button>
				</div>
			))}
		</>
	)
}

UserCard.propTypes = {
	users: Proptypes.arrayOf(
		Proptypes.shape({
			name: Proptypes.string.isRequired,
			age: Proptypes.number.isRequired,
			email: Proptypes.string,
			id: Proptypes.string,
		}),
	).isRequired,
	func: Proptypes.func.isRequired,
	img: Proptypes.string.isRequired,
}

export default UserCard
