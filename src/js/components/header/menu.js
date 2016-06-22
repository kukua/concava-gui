import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { instance as user } from '../../lib/user'
import actions from '../../actions/user'

const mapStateToProps = (state) => {
	let user = state.user.login.item
	return { user }
}

const mapDispatchToProps = (/*dispatch*/) => {
	return {
	}
}

class Menu extends React.Component {
	onLogout () {
		actions.logout()
		this.context.router.replace('/users/login')
	}

	getMenu () {
		if (user.token) {
			return (
				<div class="navbar-collapse collapse" id="navbar-main">
					<ul class="nav navbar-nav">
						<li><Link to="devices">Devices</Link></li>
						<li><Link to="templates">Templates</Link></li>
					</ul>
					<ul class="nav navbar-nav pull-right">
						<li><a href="javascript:;">{user.get('name')}</a></li>
						<li><a href="javascript:;" onClick={this.onLogout.bind(this)}>Logout</a></li>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu)
