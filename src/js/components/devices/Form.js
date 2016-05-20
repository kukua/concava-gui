import React from 'react'
import { Link } from 'react-router'
import { NotificationManager } from 'react-notifications'
import request from 'request'

export default class Form extends React.Component {

	handleSubmit(e) {
		e.preventDefault()

		var form = e.target
		var formData = {
			template_id: 1,
			name: form.name.value,
			udid: form.deviceId.value
		}

		var self = this
		request.post({
			url: 'http://demo.kukua.tech/devices',
			accept: 'application/json',
			body: formData,
			headers: {
				'Authorization': 'Token ' + localStorage.token
			},
			json: true
		}, function callback(err, httpResponse, body) {
			if (httpResponse.statusCode != '200') {
				if (body.messages) {
					var error = 'Double check the input fields'
				} else {
					var error = body.message
				}

				NotificationManager.error(error, 'Whoops!')
				return
			} else {
				NotificationManager.success('Device created', 'Success')
				self.context.router.replace('/devices')
			}
		})
	}

	render() {
		var deviceName = ''
		var deviceId   = ''

		if (this.props.data) {
			deviceId   = this.props.data.deviceId
			deviceName = this.props.data.name
		}

		return (
			<div>
				<form class='form form-horizontal' onSubmit={this.handleSubmit.bind(this)} method="post" >
					<div class='form-group'>
						<label class='col-sm-offset-1 col-sm-3 control-label' for='name'>Name</label>
						<div class='col-sm-6'>
							<input type='text' id='name' name='name' class='form-control' defaultValue={deviceName} />
						</div>
					</div>
					<div class='form-group'>
						<label class='col-sm-offset-1 col-sm-3 control-label' for='deviceId'>Device ID</label>
						<div class='col-sm-6'>
							<input type='text' id='deviceId' name='deviceId' class='form-control' defaultValue={deviceId}/>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3 control-label"></label>
						<div class="col-sm-6">
							<button type="submit" class="btn btn-primary pull-left">{this.props.submit}</button>
							<Link to="/devices" class="btn btn-link pull-right">Cancel</Link>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

Form.propTypes = {
	data: React.PropTypes.shape({
		deviceId: React.PropTypes.number.isRequired,
		name: React.PropTypes.string.isRequired
	}),
	submit: React.PropTypes.string.isRequired
}
Form.contextTypes = {
	router: React.PropTypes.object.isRequired
}
