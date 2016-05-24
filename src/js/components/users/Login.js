import React from 'react'
import Title from '../Title'
import { Link } from 'react-router'

export default class Login extends React.Component {
	onSubmit (ev) {
		ev.preventDefault()

		let form = ev.target
		this.props.onLogin(form.email.value, form.password.value)
	}

	componentWillReceiveProps (next) {
		console.log('receive', next)
		if ( ! next.isFetching && next.item) {
			localStorage.token = next.item.token
			this.context.router.replace('/')
		}
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Login" />
					{ this.props.isFetching
						? <p>Logging in…</p>
						: <form class="form form-horizontal" method="POST" onSubmit={this.onSubmit.bind(this)}>
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
									<Link to="/users/register" class="btn btn-link pull-right">Register</Link>
								</div>
							</div>
						</form>
					}
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	onLogin: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool.isRequired
}
Login.contextTypes = {
	router: React.PropTypes.object.isRequired
}
