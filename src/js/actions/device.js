import request from 'request'
import config from '../config.js'
import notify from '../lib/notify'

export default {
	fetchAll () {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_FETCH_ALL' })

			request({
				url: config.apiUrl + '/devices',
				headers: {
					'Authorization': 'Token ' + localStorage.token
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
					'Authorization': 'Token ' + localStorage.token
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

			let values = data

			request.post({
				url: config.apiUrl + '/templates',
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				body: {
					name: data.name,
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_CREATE_FAIL', err, data })
					return
				}

				values.template_id = data.id

				request.post({
					url: config.apiUrl + '/devices',
					headers: {
						'Authorization': 'Token ' + localStorage.token
					},
					body: values,
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
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_UPDATE', data })

			request.put({
				url: config.apiUrl + '/devices/' + data.id,
				headers: {
					'Authorization': 'Token ' + localStorage.token
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
			})
		}
	},

	destroy (id, cb) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_DESTROY', id })

			request.delete({
				url: config.apiUrl + '/devices/' + id,
				headers: {
					'Authorization': 'Token ' + localStorage.token
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
