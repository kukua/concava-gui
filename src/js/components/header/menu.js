import React from 'react'
import { Link } from 'react-router'

export default class Menu extends React.Component {
	onLogout () {
		localStorage.clear()
		this.context.router.replace('/users/login')
	}

	getMenu () {
		if (localStorage.token) {
			return (
				<div class="navbar-collapse collapse" id="navbar-main">
					<ul class="nav navbar-nav">
						<li><Link to="devices">Devices</Link></li>
					</ul>
					<ul class="nav navbar-nav pull-right">
						<li><Link to="#" onClick={this.onLogout.bind(this)}>Logout</Link></li>
					</ul>
				</div>
			)
		} else {
			return (
				<div class="navbar-collapse collapse" id="navbar-main">
					<ul class="nav navbar-nav pull-right">
						<li><Link to="/users/login">Login</Link></li>
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
						<Link to="/" class="navbar-brand">ConCaVa management</Link>
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
