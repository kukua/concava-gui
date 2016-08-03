import config from '../config.js'
import { instance as user } from '../lib/user'
import { checkStatus, parseJSON } from '../lib/fetch'

export default {
	fetchByUserId (id) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_FETCH_ALL' })

			return fetch(config.apiUrl + '/templates?filter=user_id:' + id + '&sort=name', {
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((items) => {
					dispatch({ type: 'TEMPLATE_FETCH_ALL_SUCCESS', items })
					return items
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'TEMPLATE_FETCH_ALL_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_FETCH' })

			return fetch(config.apiUrl + '/templates/' + id, {
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'TEMPLATE_FETCH_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'TEMPLATE_FETCH_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_CREATE' })

			return fetch(config.apiUrl + '/templates', {
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
					dispatch({ type: 'TEMPLATE_CREATE_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'TEMPLATE_CREATE_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_UPDATE' })

			return fetch(config.apiUrl + '/templates/' + data.id, {
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
					dispatch({ type: 'TEMPLATE_UPDATE_SUCCESS', item })
					dispatch({ type: 'TEMPLATE_FETCH_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'TEMPLATE_UPDATE_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	duplicate (id) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_DUPLICATE' })

			return fetch(config.apiUrl + '/templates/' + id + '/duplicate', {
				method: 'POST',
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'TEMPLATE_DUPLICATE_SUCCESS', item })
					dispatch({ type: 'TEMPLATE_FETCH_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'TEMPLATE_DUPLICATE_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	destroy (id) {
		return (dispatch) => {
			dispatch({ type: 'TEMPLATE_DESTROY' })

			return fetch(config.apiUrl + '/templates/' + id, {
				method: 'DELETE',
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'TEMPLATE_DESTROY_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'TEMPLATE_DESTROY_FAIL', err })
					return Promise.reject(err)
				})
		}
	},
}
