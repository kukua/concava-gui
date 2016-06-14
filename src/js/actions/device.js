import request from 'request'
import config from '../config.js'

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

			request.post({
				url: config.apiUrl + '/devices',
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_CREATE_FAIL', err, data })
					return
				}

				dispatch({ type: 'DEVICE_CREATE_SUCCESS', item: data })
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_UPDATE', data })

			request.put({
				url: config.apiUrl + '/devices/' + data.id,
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'DEVICE_UPDATE_FAIL', err, data })
					return
				}

				dispatch({ type: 'DEVICE_UPDATE_SUCCESS', item: data })
			})
		}
	},

	destroy (id) {
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
					return
				}

				dispatch({ type: 'DEVICE_DESTROY_SUCCESS', item: data })
			})
		}
	},
}
