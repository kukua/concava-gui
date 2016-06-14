import React from 'react'
import Header from '../header/header'
import Notifications from '../../containers/layout/notifications'

export default class Master extends React.Component {
	render () {
		return (
			<div>
				<div class="container">
					<Header />
					{this.props.children}
					<Notifications />
				</div>
			</div>
		)
	}
}

Master.propTypes = {
	children: React.PropTypes.element
}
