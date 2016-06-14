import request from 'request'
import config from '../config.js'

export default {
	fetchByDeviceId (id) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_FETCH_ALL', id })

			const includes = 'template.attributes.converters,template.attributes.calibrators,template.attributes.validators'

			request({
				url: config.apiUrl + '/devices?filter=udid:' + id + '&include=' + includes,
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

			request({
				url: config.apiUrl + '/attributes/' + id,
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
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'ATTRIBUTE_CREATE_FAIL', err, data })
					return
				}

				dispatch({ type: 'ATTRIBUTE_CREATE_SUCCESS', item: data })
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_UPDATE', data })

			request.put({
				url: config.apiUrl + '/attributes/' + data.id,
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'ATTRIBUTE_UPDATE_FAIL', err, data })
					return
				}

				dispatch({ type: 'ATTRIBUTE_UPDATE_SUCCESS', item: data })
			})
		}
	},

	destroy (id) {
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
					return
				}

				dispatch({ type: 'ATTRIBUTE_DESTROY_SUCCESS', item: data })
			})
		}
	},
}
