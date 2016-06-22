import { NotificationManager } from 'react-notifications'
import _ from 'underscore'

export default {
	action (type, action) {
		let message = _.capitalize(type, true) + ' ' + action + '.'
		NotificationManager.success(message)
	},
	created (type) {
		this.action(type, 'created')
	},
	updated (type) {
		this.action(type, 'updated')
	},
	destroyed (type) {
		this.action(type, 'destroyed')
	},
}
