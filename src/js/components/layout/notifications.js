import React from 'react'
import _ from 'underscore'
import { NotificationContainer, NotificationManager } from 'react-notifications'

export default class Notifications extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			handled: []
		}
	}

	componentWillMount () {
		this.handle(this.props.errors)
	}
	componentWillReceiveProps (next) {
		this.handle(next.errors)
	}
	handle (errors) {
		if ( ! _.isArray(errors)) return

		let handled = this.state.handled

		_.each(errors, (item) => {
			if (_.indexOf(handled, item) !== -1) return
			handled.push(item)

			let message = item.err
			if ( ! message && _.isObject(item.data)) {
				message = _.map(item.data.messages, (message) => message[0]).join('\n')
			}
			if ( ! message) message = 'An unknown error occured.'
			NotificationManager.error(message, 'Whoops!')
		})

		this.setState({ handled })
	}

	render () {
		return (<NotificationContainer/>)
	}
}

Notifications.propTypes = {
	errors: React.PropTypes.array
}
