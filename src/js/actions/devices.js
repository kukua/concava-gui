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
			}, function callback(err, httpResponse, body) {
				if (httpResponse.statusCode != '200') {
					NotificationManager.error(body.message, 'Whoops!')
					return
				} else {
					dispatch({ type: 'FETCHED_DEVICES', body })
				}
			})
		}
	},
	fetch (id) {
		return (dispatch) => {
			dispatch({ type: 'FETCH_DEVICE', id })

			setTimeout(() => {
				let item = { id, name: 'Device ' + id }
				dispatch({ type: 'FETCHED_DEVICE', item })
			}, 500)
		}
	}
}
