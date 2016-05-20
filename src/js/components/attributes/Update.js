import React from 'react'
import Title from '../Title'

export default class Update extends React.Component {

	componentDidMount() {
		console.log(this.props.params.id)
	}

	handleSubmit(e) {
		e.preventDefault()
		console.log('edited')
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
								<input type="text" name="name" class="form-control input-sm" />
							</div>
						</div>

						<div class="form-group">
							<label class="control-label col-sm-2">Convert</label>
							<div class="col-sm-10">
								<select class="form-control input-sm" name="convert">
									<option>int8</option>
									<option>int16le</option>
									<option>int32le</option>
									<option>uint16le</option>
									<option>uint32le</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">Calibrate</label>
							<div class="col-sm-10">
								<input type="text" class="form-control input-sm" name="calibrate" placeholder="<optional>" />
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2">Validate</label>
							<div class="col-sm-10">
								<input type="text" class="form-control input-sm" name="validate" placeholder="<optional>" />
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
