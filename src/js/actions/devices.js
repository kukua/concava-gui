//import request from 'request'
import request from 'request'
import { NotificationManager } from 'react-notifications'

export default {
	fetchAll () {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICES' })

			request.get({
				url: 'http://demo.kukua.tech/devices',
				accept: 'application/json',
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, function callback(err, httpResponse, items) {
				if (httpResponse.statusCode != '200') {
					NotificationManager.error(body.message, 'Whoops!')
					return
				} else {
					dispatch({ type: 'FETCHED_DEVICES', items })
				}
			})
		}
	},
	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICE', id })

			request.get({
				url: 'http://demo.kukua.tech/devices/' + id,
				accept: 'application/json',
				headers: {
					'Authorization': 'Token ' + localStorage.token
				},
				json: true
			}, function callback(err, httpResponse, item) {
				if (httpResponse.statusCode != '200') {
					NotificationManager.error(body.message, 'Whoops!')
					return
				} else {
					dispatch({ type: 'FETCHED_DEVICE', item })
				}
			})
		}
	}
}
