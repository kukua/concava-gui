import React from 'react'
import { Link } from 'react-router'
import { NotificationManager } from 'react-notifications';

import Title from '../Title';

export default class Form extends React.Component {
	constructor() {
		super()
	}

	handleSubmit(e) {
		e.preventDefault();
		NotificationManager.success('Success', '');
		this.context.router.replace('/devices');
	}

	render() {
		var deviceName = ""
		var deviceId   = ""
		if (this.props.data != undefined) {
			deviceName = this.props.data.name
			deviceId   = this.props.data.deviceId
		}

		return (
			<div>
				<form class='form form-horizontal' onSubmit={this.handleSubmit.bind(this)} >
					<div class='form-group'>
						<label class='col-sm-offset-1 col-sm-3 control-label' for='email'>Name</label>
						<div class='col-sm-6'>
							<input type='text' id='name' name='name' class='form-control' defaultValue={deviceName} />
						</div>
					</div>
					<div class='form-group'>
						<label class='col-sm-offset-1 col-sm-3 control-label' for='email'>Device ID</label>
						<div class='col-sm-6'>
							<input type='text' id='deviceId' name='email' class='form-control' defaultValue={deviceId}/>
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

Form.contextTypes = {
	router: React.PropTypes.object.isRequired
}
