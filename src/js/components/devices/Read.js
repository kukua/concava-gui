import React from 'react'
import Title from '../Title'
//import { Link } from 'react-router'

export default class Read extends React.Component {
	render () {
		/*
		const name = "My device #" + this.props.params.id

		const columns = {
			title: 'Attributes',
			actions: 'Actions',
			target: 'attributes'
		}

		const rows = [{
			id: 1,
			name: 'Temperature'
		}, {
			id: 2,
			name: 'Humidity'
		}, {
			id: 3,
			name: 'Rainfall'
		}]
		*/

		return (
			<div class="row">
				<div class="col-sm-12">
					<Title title="Device attributes" link="Cancel" />

					<div class="row">
						<div class="col-sm-6">
							<form class="form form-horizontal">
								<div class="form-group">
									<label class="control-label col-sm-2">Name</label>
									<div class="col-sm-10">
										<input type="text" name="attr[name]" class="form-control input-sm" />
									</div>
								</div>

								<div class="form-group">
									<label class="control-label col-sm-2">Type</label>
									<div class="col-sm-10">
										<select class="form-control input-sm">
											<option>int8</option>
											<option>int16le</option>
											<option>int32le</option>
											<option>uint16le</option>
											<option>uint32le</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2"></label>
									<div class="col-sm-10">
										<a href="#" class="btn btn-success pull-right">Add attribute</a>
									</div>
								</div>
							</form>
						</div>
						<div class="col-sm-6">
							<div class="panel panel-default">
								<div class="panel-heading">Attributes</div>
								<div class="panel-body">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
