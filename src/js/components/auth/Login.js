import React from 'react'
import { NotificationManager } from 'react-notifications'

import Title from '../Title'

export default class Login extends React.Component {

	handleLogin(e) {
		e.preventDefault()
		localStorage.token = 'true'
		NotificationManager.success('Successfully logged in', 'Welcome')
		this.context.router.replace('/')
	}

	render() {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title='Login' />
					<form class="form form-horizontal" action="" onSubmit={this.handleLogin.bind(this)} method="post">
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label" for="email">E-mail address</label>
							<div class="col-sm-6">
								<input type="email" id="email" name="email" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label" for="password">Password</label>
							<div class="col-sm-6">
								<input type="password" id="password" name="password" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label"></label>
							<div class="col-sm-6">
								<button type="submit" class="btn btn-success pull-left">Login</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
}
