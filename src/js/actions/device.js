import request from 'request'
import config from '../config.js'
import { instance as user } from '../lib/user'
import notify from '../lib/notify'

export default {
	fetchAll () {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_FETCH_ALL' })

			const include = 'template'

			request({
				url: config.apiUrl + '/devices',
				qs: {
					include,
				},
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_FETCH_ALL_FAIL', err, data })
					return
				}

				dispatch({ type: 'DEVICE_FETCH_ALL_SUCCESS', items: data })
			})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_FETCH', id })

			request({
				url: config.apiUrl + '/devices/' + id,
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_FETCH_FAIL', err, data })
					return
				}

				dispatch({ type: 'DEVICE_FETCH_SUCCESS', item: data })
			})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_CREATE', data })

			request.post({
				url: config.apiUrl + '/devices',
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_CREATE_FAIL', err, data })
					return
				}

				notify.created('device')
				dispatch({ type: 'DEVICE_CREATE_SUCCESS', item: data })
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_UPDATE', data })

			request.put({
				url: config.apiUrl + '/devices/' + data.id,
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_UPDATE_FAIL', err, data })
					return
				}

				notify.updated('device')
				dispatch({ type: 'DEVICE_UPDATE_SUCCESS', item: data })
				dispatch({ type: 'DEVICE_FETCH_SUCCESS', item: data })
			})
		}
	},

	destroy (id, cb) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_DESTROY', id })

			request.delete({
				url: config.apiUrl + '/devices/' + id,
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_DESTROY_FAIL', err, data })
					if (cb) cb(err || data)
					return
				}

				notify.destroyed('device')
				dispatch({ type: 'DEVICE_DESTROY_SUCCESS', item: data })
				if (cb) cb()
			})
		}
	},
}
