import config from '../config.js'
import { instance as user } from '../lib/user'
import { checkStatus, parseJSON } from '../lib/fetch'

export default {
	fetchByTemplateId (id) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_FETCH_ALL' })

			const include = [
				'attributes.converters',
				'attributes.calibrators',
				'attributes.validators',
			].join(',')

			return fetch(config.apiUrl + '/templates?filter=id:' + id + '&include=' + include, {
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((data) => {
					let items = (data[0] ? data[0].attributes : [])
					dispatch({ type: 'ATTRIBUTE_FETCH_ALL_SUCCESS', items })
					return items
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'ATTRIBUTE_FETCH_ALL_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_FETCH' })

			const include = 'converters,calibrators,validators'

			return fetch(config.apiUrl + '/attributes/' + id + '?include=' + include, {
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'ATTRIBUTE_FETCH_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'ATTRIBUTE_FETCH_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_CREATE' })

			return fetch(config.apiUrl + '/attributes', {
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
					dispatch({ type: 'ATTRIBUTE_CREATE_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'ATTRIBUTE_CREATE_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_UPDATE' })

			const include = 'converters,calibrators,validators'

			return fetch(config.apiUrl + '/attributes/' + data.id + '?include=' + include, {
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
					dispatch({ type: 'ATTRIBUTE_UPDATE_SUCCESS', item })
					dispatch({ type: 'ATTRIBUTE_FETCH_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'ATTRIBUTE_UPDATE_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	destroy (id) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_DESTROY' })

			return fetch(config.apiUrl + '/attributes/' + id, {
				method: 'DELETE',
				headers: {
					'Authorization': 'Token ' + user.token,
					'Accept': 'application/json',
				},
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'ATTRIBUTE_DESTROY_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'ATTRIBUTE_DESTROY_FAIL', err })
					return Promise.reject(err)
				})
		}
	},

	reorder (templateId, order) {
		return (dispatch) => {
			dispatch({ type: 'ATTRIBUTE_REORDER' })

			return fetch(config.apiUrl + '/attributes/reorder', {
				method: 'PUT',
				headers: {
					'Authorization': 'Token ' + user.token,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					template_id: templateId,
					order,
				}),
			})
				.then(checkStatus)
				.then(parseJSON)
				.then((item) => {
					dispatch({ type: 'ATTRIBUTE_REORDER_SUCCESS', item })
					return item
				})
				.catch((err) => {
					dispatch({ type: 'ERROR_ADD', err })
					dispatch({ type: 'ATTRIBUTE_REORDER_FAIL', err })
					return Promise.reject(err)
				})
		}
	},
}
