import React from 'react'
import { Link } from 'react-router'
import { NotificationManager } from 'react-notifications'

export default class Menu extends React.Component {
	handleLogout() {
		localStorage.clear()
		NotificationManager.info('Untill we meet next time', 'C ya!')
		this.context.router.replace('/auth/login')
	}

	getMenu() {
		if (localStorage.token != undefined) {
			return (
				<div class="navbar-collapse collapse" id="navbar-main">
					<ul class="nav navbar-nav">
						<li><Link to="devices">Devices</Link></li>
					</ul>
					<ul class="nav navbar-nav pull-right">
						<li><Link to="#" onClick={this.handleLogout.bind(this)}>Logout</Link></li>
					</ul>
				</div>
			)
		} else {
			return (
				<div class="navbar-collapse collapse" id="navbar-main">
					<ul class="nav navbar-nav pull-right">
						<li><Link to="auth/login">Login</Link></li>
					</ul>
				</div>
			)
		}
	}

	render () {
		return (
			<div class="navbar navbar-default navbar-fixed-top">
				<div class="container">
					<div class="navbar-header">
						<Link to="/" class="navbar-brand">ConCaVa GUI</Link>
						<button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>
					{this.getMenu()}
				</div>
			</div>
		)
	}
}

Menu.contextTypes = {
	router: React.PropTypes.object.isRequired
}
