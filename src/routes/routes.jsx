import Login from '../pages/Login'
import ProtectedRoutes from '../routes/ProtectedRoutes'

import List from '../pages/List'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Routering = () => {
	return (
		<Router>
			<Routes>
				<Route
					path='*'
					element={<Login />}
				/>
				<Route
					path='/list'
					element={
						<ProtectedRoutes>
							<List />
						</ProtectedRoutes>
					}
				/>
			</Routes>
		</Router>
	)
}

export default Routering
