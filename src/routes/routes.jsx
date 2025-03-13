import Login from '../pages/Login'
import ProtectedRoutes from '../routes/ProtectedRoutes'

import List from '../pages/List'
import Test from '../pages/Test'

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
					path='/test'
					element={<Test />}
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
