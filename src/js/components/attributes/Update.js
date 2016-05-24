import React from 'react'
import Title from '../Title'
import request from 'request'

export default class Update extends React.Component {

	componentWillMount() {
		var id = this.props.params.udid
		var self = this
		request.get({
			url: 'http://demo.kukua.tech/devices\?filter\=udid:' + id + '\&include\=template.attributes.converters,template.attributes.calibrators,template.attributes.validators',
			accept: 'application/json',
			headers: {
				'Authorization': 'Token ' + localStorage.token
			},
			json: true
		}, function callback(err, httpResponse, data) {
			if (httpResponse.statusCode != '200') {
				NotificationManager.error(data.message, 'Whoops!')
				return
			} else {
				self.setState(data[0])
			}
		})
	}

	handleSubmit(e) {
		e.preventDefault()

		var form = e.target
		var formData = {
			converter: form.converter.value,
			calibrator: form.calibrator.value,
			validator: form.validator.value
		}

		var self = this
		request.post({
			url: 'http://demo.kukua.tech/attributes/' + this.props.params.id,
			body: formData,
			accept: 'application/json',
			headers: {
				Authorization: 'Token ' + localStorage.token
			},
			json: true
		}, function callback(err, httpResponse, body) {
			if (err) {
				NotificationManager.error(body.message, 'Whoops!')
				return
			}
			console.log(body)
			//self.context.router.replace('<url>')
		})
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-8 col-sm-offset-2">
					<Title title='Edit attributes' button="Cancel" />
					<form class="form form-horizontal" method="post" onSubmit={this.handleSubmit.bind(this)}>
						<div class="form-group">
							<label class="control-label col-sm-2">Name</label>
							<div class="col-sm-10">
								<input type="text" name="name" class="form-control input-sm"/>
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-sm-2">Converter</label>
							<div class="col-sm-10">
								<select class="form-control input-sm" name="converter">
									<option>int8</option>
									<option>int16le</option>
									<option>int32le</option>
									<option>uint16le</option>
									<option>uint32le</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">Calibrator</label>
							<div class="col-sm-10">
								<input type="text" class="form-control input-sm" name="calibrator" placeholder="<optional>" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">Validatorr</label>
							<div class="col-sm-10">
								<input type="text" class="form-control input-sm" name="validator" placeholder="<optional>" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2"></label>
							<div class="col-sm-10">
								<button type="submit" class="btn btn-success pull-right">Save</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

Update.propTypes = {
	params: React.PropTypes.object.isRequired
}
