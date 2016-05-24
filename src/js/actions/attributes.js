import request from 'request'
import { NotificationManager } from 'react-notifications'

export default {
	fetchAll(id) {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICE_ATTR'})

			request.get({
				url: 'http://demo.kukua.tech/devices\?filter\=udid:' + id + '\&include\=template.attributes.converters,template.attributes.calibrators,template.attributes.validators',
				accept: 'application/json',
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, function callback(err, httpResponse, data) {
				if (httpResponse.statusCode != '200') {
					NotificationManager.error(data.message, 'Whoops!')
					return
				} else {
					dispatch({ type: 'FETCHED_DEVICE_ATTR', device: data[0]})
				}
			})
		}
	},

	create(data) {
		return (dispatch) => {
			dispatch({ type: 'CREATE_DEVICE_ATTR'})

			request.post({
				url: 'http://demo.kukua.tech/attributes',
				accept: 'application/json',
				body: data,
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, function callback(err, httpResponse, data) {
				if (httpResponse.statusCode != '200') {
					NotificationManager.error(data.message, 'Whoops!')
					return
				} else {
					dispatch({ type: 'CREATED_DEVICE_ATTR' })
				}
			})
		}
	},

	update(data) {
		return (dispatch) => {
			dispatch({ type: 'UPDATE_ATTR'})

			//ajax result
			dispatch({ type: 'UPDATED_ATTR' })
		}
	}
}
