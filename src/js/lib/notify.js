import { NotificationManager } from 'react-notifications'
import _ from 'underscore'

function error (data) {
	let message = data.message
	if ( ! message && _.isObject(data.messages)) {
		message = _.map(data.messages, (message) => message[0]).join('\n')
	}
	if ( ! message) message = 'An unknown error occured.'
	NotificationManager.error(message, 'Whoops!')
}

function created (type) {
	let message = type.substr(0, 1) + type.substr(1) + ' created.'
	NotificationManager.success(message, 'Success!')
}

export default { error, created }
