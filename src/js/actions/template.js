import request from 'request'
import config from '../config.js'
import { instance as user } from '../lib/user'
import notify from '../lib/notify'

export default {
	fetchByUserId (id) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_FETCH_ALL', id })

			request({
				url: config.apiUrl + '/templates',
				qs: {
					filter: 'user_id:' + id,
				},
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'TEMPLATE_FETCH_ALL_FAIL', err, data })
					return
				}

				dispatch({ type: 'TEMPLATE_FETCH_ALL_SUCCESS', items: data })
			})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_FETCH', id })

			request({
				url: config.apiUrl + '/templates/' + id,
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'TEMPLATE_FETCH_FAIL', err, data })
					return
				}

				dispatch({ type: 'TEMPLATE_FETCH_SUCCESS', item: data })
			})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_CREATE', data })

			request.post({
				url: config.apiUrl + '/templates',
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'TEMPLATE_CREATE_FAIL', err, data })
					return
				}

				notify.created('template')
				dispatch({ type: 'TEMPLATE_CREATE_SUCCESS', item: data })
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_UPDATE', data })

			request.put({
				url: config.apiUrl + '/templates/' + data.id,
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				body: data,
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'TEMPLATE_UPDATE_FAIL', err, data })
					return
				}

				notify.updated('template')
				dispatch({ type: 'TEMPLATE_UPDATE_SUCCESS', item: data })
				dispatch({ type: 'TEMPLATE_FETCH_SUCCESS', item: data })
			})
		}
	},

	destroy (id, cb) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_DESTROY', id })

			request.delete({
				url: config.apiUrl + '/templates/' + id,
				headers: {
					'Authorization': 'Token ' + user.token,
				},
				json: true
			}, (err, httpResponse, data) => {
				if (err || httpResponse.statusCode != 200) {
					dispatch({ type: 'ERROR_ADD', err, data })
					dispatch({ type: 'TEMPLATE_DESTROY_FAIL', err, data })
					if (cb) cb(err || data)
					return
				}

				notify.destroyed('template')
				dispatch({ type: 'TEMPLATE_DESTROY_SUCCESS', item: data })
				if (cb) cb()
			})
		}
	},
}
