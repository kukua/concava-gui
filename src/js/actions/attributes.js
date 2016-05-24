import request from 'request'
import notify from '../lib/notify'

export default {
	fetchByDeviceId (id) {
		return (dispatch) => {
			dispatch({ type: 'FETCH_ATTRIBUTES' })

			request({
				url: 'http://demo.kukua.tech/devices?filter=udid:' + id + '&include=template.attributes.converters,template.attributes.calibrators,template.attributes.validators',
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'FETCHED_ATTRIBUTES', items: data[0].template.attributes })
			})
		}
	},

	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'FETCH_ATTRIBUTE', id })

			request({
				url: 'http://demo.kukua.tech/attributes/' + id,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'FETCHED_ATTRIBUTE', item: data })
			})
		}
	},

	create (data) {
		return (dispatch) => {
			dispatch({ type: 'CREATE_ATTRIBUTE' })

			request.post({
				url: 'http://demo.kukua.tech/attributes',
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'CREATED_ATTRIBUTE', item: data })
			})
		}
	},

	update (data) {
		return (dispatch) => {
			dispatch({ type: 'UPDATE_ATTRIBUTE' })

			request.put({
				url: 'http://demo.kukua.tech/attributes/' + data.id,
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'UPDATED_ATTRIBUTE', item: data })
			})
		}
	},

	delete (id) {
		return (dispatch) => {
			dispatch({ type: 'DELETE_ATTRIBUTE' })

			request.delete({
				url: 'http://demo.kukua.tech/attributes/' + id,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, (err, httpResponse, data) => {
				if (httpResponse.statusCode != 200) return notify.error(data)

				dispatch({ type: 'DELETED_ATTRIBUTE', item: data })
			})
		}
	},
}
