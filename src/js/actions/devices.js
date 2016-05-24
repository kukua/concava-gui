import request from 'request'
import notify from '../lib/notify'

export default {
	fetchAll () {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICES' })

			request({
				url: 'http://demo.kukua.tech/devices',
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'FETCHED_DEVICES', items: data })
			})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICE', id })

			request({
				url: 'http://demo.kukua.tech/devices/' + id,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'FETCHED_DEVICE', item: data })
			})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'CREATE_DEVICE' })

			let body = data

			request.post({
				url: 'http://demo.kukua.tech/templates',
				body: { name: data.name },
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				body.template_id = data.id

				request.post({
					url: 'http://demo.kukua.tech/devices',
					body,
					headers: {
						'Authorization': 'Token ' + localStorage.token
					},
					json: true
				}, (err, httpResponse, data) => {
					if (httpResponse.statusCode != 200) return notify.error(data)

					dispatch({ type: 'CREATED_DEVICE', item: data })
				})
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'UPDATE_DEVICE' })

			request.put({
				url: 'http://demo.kukua.tech/devices/' + data.id,
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'UPDATED_DEVICE', item: data })
			})
		}
	},

	delete (id) {
		return (dispatch) => {
			dispatch({ type: 'DELETE_DEVICE' })

			request.delete({
				url: 'http://demo.kukua.tech/devices/' + id,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'DELETED_DEVICE', item: data })
			})
		}
	},
}
