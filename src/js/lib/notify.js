import { NotificationManager } from 'react-notifications'
import _ from 'underscore'

export default {
	created (type) {
		let message = _.capitalize(type, true) + ' created.'
		NotificationManager.success(message)
	},
	updated (type) {
		let message = _.capitalize(type, true) + ' updated.'
		NotificationManager.success(message)
	},
	destroyed (type) {
		let message = _.capitalize(type, true) + ' deleted.'
		NotificationManager.success(message)
	},
}
