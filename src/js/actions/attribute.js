import request from 'request'
import config from '../config.js'
import notify from '../lib/notify'

export default {
	fetchByDeviceId (id) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_FETCH_ALL', id })

			const include = 'template.attributes.converters,template.attributes.calibrators,template.attributes.validators'

			request({
				url: config.apiUrl + '/devices',
				qs: {
					filter: 'id:' + id,
					include,
				},
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'ATTRIBUTE_FETCH_ALL_FAIL', err, data })
					return
				}

				dispatch({ type: 'ATTRIBUTE_FETCH_ALL_SUCCESS', items: data[0].template.attributes })
			})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_FETCH', id })

			const include = 'converters,calibrators,validators'

			request({
				url: config.apiUrl + '/attributes/' + id,
				qs: {
					include,
				},
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'ATTRIBUTE_FETCH_FAIL', err, data })
					return
				}

				dispatch({ type: 'ATTRIBUTE_FETCH_SUCCESS', item: data })
			})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_CREATE', data })

			request.post({
				url: config.apiUrl + '/attributes',
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'ATTRIBUTE_CREATE_FAIL', err, data })
					return
				}

				notify.created('attribute')
				dispatch({ type: 'ATTRIBUTE_CREATE_SUCCESS', item: data })
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_UPDATE', data })

			const include = 'converters,calibrators,validators'

			request.put({
				url: config.apiUrl + '/attributes/' + data.id,
				qs: {
					include,
				},
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'ATTRIBUTE_UPDATE_FAIL', err, data })
					return
				}

				notify.updated('attribute')
				dispatch({ type: 'ATTRIBUTE_UPDATE_SUCCESS', item: data })
			})
		}
	},

	destroy (id, cb) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_DESTROY', id })

			request.delete({
				url: config.apiUrl + '/attributes/' + id,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'ATTRIBUTE_DESTROY_FAIL', err, data })
					if (cb) cb(err || data)
					return
				}

				notify.destroyed('attribute')
				dispatch({ type: 'ATTRIBUTE_DESTROY_SUCCESS', item: data })
				if (cb) cb()
			})
		}
	},
}
