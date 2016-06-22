import request from 'request'
import config from '../config'
import { instance as user } from '../lib/user'

export default {
	login (email, password) {
		return (dispatch) => {
			dispatch({ type: 'USER_LOGIN', email, password })

			var auth = new Buffer(email + ':' + password)
				.toString('base64')

			request({
				url: config.apiUrl + '/users/login',
				headers: {
					'Authorization': 'Basic ' + auth
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					user.clear()
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'USER_LOGIN_FAIL', err, data })
					return
				}

				dispatch({ type: 'USER_LOGIN_SUCCESS', item: data })
			})
		}
	},

	logout () {
		user.clear()
		return { type: 'USER_LOGOUT' }
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'USER_CREATE' })

			request.post({
				url: config.apiUrl + '/users',
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					user.clear()
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'USER_CREATE_FAIL', err, data })
					return
				}

				dispatch({ type: 'USER_CREATE_SUCCESS', item: data })
			})
		}
	},
}
