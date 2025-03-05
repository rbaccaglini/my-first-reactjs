import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default class UserServices {
	constructor() {
		this.axios = axios.create({
			baseURL: 'http://localhost:8080',
		})
	}

	async getUsers() {
		return this.axios.get('/user')
	}

	async getUserByEmail(email) {
		const response = await this.axios
			.get(`/user/email/${email}`)
			.catch((error) => {
				console.log('NOK ', error.response.data.message)
				return {
					status: error.status,
					data: [{}],
				}
			})

		return {
			status: response.status,
			data: [response.data],
		}
	}

	async deleteUser(id) {
		return this.axios.delete(`/user/${id}`)
	}

	async createNewUser(dados) {
		dados.age = parseInt(dados.age)
		return this.axios.post('/user', dados)
	}

	async login(dados) {
		const response = await this.axios.post('/login', dados)
		const statusCode = response.status
		const data = response.data
		const headers = response.headers
		if (statusCode == 200) {
			const token = headers['authorization'] || headers['Authorization']
			localStorage.setItem('name', data.name)
			localStorage.setItem('email', data.email)
			localStorage.setItem('userid', data.id)
			localStorage.setItem('age', data.age)
			localStorage.setItem('token', token)
		}
		return statusCode
	}

	usuarioAutenticado() {
		const token = localStorage.getItem('token')
		if (this.isTokenValid(token)) {
			return true
		}

		localStorage.removeItem('name')
		localStorage.removeItem('email')
		localStorage.removeItem('userid')
		localStorage.removeItem('age')
		localStorage.removeItem('token')

		return false
	}

	async logout() {
		localStorage.removeItem('name')
		localStorage.removeItem('email')
		localStorage.removeItem('userid')
		localStorage.removeItem('age')
		localStorage.removeItem('token')
	}

	isTokenValid(token) {
		if (!token) return false

		try {
			const decodedToken = jwtDecode(token)
			const currentTime = Date.now() / 1000 // em segundos
			return decodedToken.exp > currentTime
		} catch (error) {
			console.error('Token inválido', error)
			return false
		}
	}
}
