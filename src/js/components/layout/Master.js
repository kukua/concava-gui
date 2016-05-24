import React from 'react'
import Header from '../header/Header'
import { NotificationContainer } from 'react-notifications'

export default class Master extends React.Component {
	render () {
		return (
			<div>
				<div class="container">
					<Header />
					{this.props.children}
					<NotificationContainer/>
				</div>
			</div>
		)
	}
}

Master.propTypes = {
	children: React.PropTypes.element
}
