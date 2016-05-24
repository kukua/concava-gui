import request from 'request'
import notify from '../lib/notify'

export default {
	login (email, password) {
		return (dispatch) => {
			dispatch({ type: 'LOGIN_ATTEMPT', email, password })

			var auth = new Buffer(email + ':' + password)
				.toString('base64')

			request({
				url: 'http://demo.kukua.tech/users/login',
				headers: {
					'Authorization': 'Basic ' + auth
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) {
					localStorage.clear()
					return notify.error(data)
				}

				dispatch({ type: 'LOGIN_SUCCESS', item: data })
			})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'CREATE_USER' })

			request.post({
				url: 'http://demo.kukua.tech/users',
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) {
					localStorage.clear()
					return notify.error(data)
				}

				dispatch({ type: 'CREATED_USER', item: data })
			})
		}
	},
}
