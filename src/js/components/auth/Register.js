import React from 'react'
import { NotificationManager } from 'react-notifications'
import Title from '../Title'
import request from 'request'

export default class Register extends React.Component {

	handleRegister(e) {
		e.preventDefault()

		var form = e.target
		var formData = {
			name: form.name.value,
			email: form.email.value,
			password: form.password.value,
			password_confirmation: form.password_confirmation.value
		}

		var self = this
		request.post({
			url: 'http://demo.kukua.tech/users',
			body: formData,
			accept: 'application/json',
			json: true
		}, function callback(err, httpResponse, body) {
			if (err) {
				localStorage.clear()
				NotificationManager.error(body.message, 'Whoops!')
				return
			}
			localStorage.token = body.token
			self.context.router.replace('/')
		})
	}

	render() {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title='Register' button="Go back"/>
					<form class="form form-horizontal" action="" onSubmit={this.handleRegister.bind(this)} method="post">
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label" for="name">Name</label>
							<div class="col-sm-6">
								<input type="name" id="name" name="name" class="form-control" />
							</div>
						</div>
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
							<label class="col-sm-offset-1 col-sm-3 control-label" for="password_confirmation">Password (confirm)</label>
							<div class="col-sm-6">
								<input type="password" id="password_confirmation" name="password_confirmation" class="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3 control-label"></label>
							<div class="col-sm-6">
								<button type="submit" class="btn btn-success pull-left">Register</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

Register.contextTypes = {
	router: React.PropTypes.object.isRequired
}
