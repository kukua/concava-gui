import React from 'react'
import { Link } from 'react-router'

export default class Form extends React.Component {
	onSubmit (ev) {
		ev.preventDefault()

		let form = ev.target
		let data = {
			name: form.name.value,
			udid: form.deviceId.value
		}
		console.log(data)
		//this.context.router.replace('/devices')
	}

	render () {
		let data = (this.props.data || {})

		return (
			<div>
				<form class="form form-horizontal" method="POST" onSubmit={this.onSubmit.bind(this)}>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3 control-label" for="name">Name</label>
						<div class="col-sm-6">
							<input type="text" id="name" name="name" class="form-control" value={data.deviceName || ''} />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3 control-label" for="deviceId">Device ID</label>
						<div class="col-sm-6">
							<input type="text" id="deviceId" name="deviceId" class="form-control" value={data.deviceId || ''}/>
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
