import _ from 'underscore'
import config from '../config.js'
import { instance as user } from '../lib/user'
import { checkStatus, parseJSON } from '../lib/fetch'

function formatLabels (labels) {
	if ( ! labels) return
	var formatted = {}
	_.each(labels, ({name, value}) => formatted[name] = value)
	return formatted
}

export default {
	fetchAll () {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_FETCH_ALL' })

			return fetch(config.apiUrl + '/devices?include=template&sort=name', {
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((items) => {
					dispatch({ type: 'DEVICE_FETCH_ALL_SUCCESS', items })
					return items
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'DEVICE_FETCH_ALL_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_FETCH' })

			return fetch(config.apiUrl + '/devices/' + id + '?include=labels', {
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'DEVICE_FETCH_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'DEVICE_FETCH_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_CREATE' })

			data.labels = formatLabels(data.labels)

			return fetch(config.apiUrl + '/devices', {
				method: 'POST',
				headers: {
					'Authorization': 'Token ' + user.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'DEVICE_CREATE_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'DEVICE_CREATE_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_UPDATE' })

			data.labels = formatLabels(data.labels)

			return fetch(config.apiUrl + '/devices/' + data.id, {
				method: 'PUT',
				headers: {
					'Authorization': 'Token ' + user.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'DEVICE_UPDATE_SUCCESS', item })
					dispatch({ type: 'DEVICE_FETCH_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'DEVICE_UPDATE_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	destroy (id) {
		return (dispatch) => {
			dispatch({ type: 'DEVICE_DESTROY' })

			return fetch(config.apiUrl + '/devices/' + id, {
				method: 'DELETE',
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'DEVICE_DESTROY_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'DEVICE_DESTROY_FAIL', err })
					return Promise.reject(err)
				})
		}
	},
}
