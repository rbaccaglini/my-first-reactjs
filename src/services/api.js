import axios from 'axios'

export default class UserServices {
	constructor() {
		this.axios = axios.create({
			baseURL: 'http://localhost:8080',
		})
	}

	async getUsers() {
		return this.axios.get('/user')
	}

	async deleteUser(id) {
		return this.axios.delete(`/user/${id}`)
	}

	async createNewUser(dados) {
		dados.age = parseInt(dados.age)
		console.log(dados)
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
		return localStorage.getItem('token') != 'undefined' ? true : false
	}

	async logout() {
		localStorage.removeItem('name')
		localStorage.removeItem('email')
		localStorage.removeItem('userid')
		localStorage.removeItem('age')
		localStorage.removeItem('token')
	}
}
