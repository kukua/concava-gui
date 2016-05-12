import React from 'react'
import Title from '../Title';
import { Link } from 'react-router'

export default class Update extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-12">
					<Title title="Device attributes" link='Cancel'/>

					<div class="row">
						<div class="col-sm-4">
							<form class="form form-horizontal" onSubmit={this.handleSubmit}>
								<div class="form-group">
									<label class="control-label col-sm-2">Name</label>
									<div class="col-sm-10">
										<input type="text" name="attr[name]" class="form-control input-sm" />
									</div>
								</div>

								<div class="form-group">
									<label class="control-label col-sm-2">Convert</label>
									<div class="col-sm-10">
										<select class="form-control input-sm" name="convert[type]">
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
										<input type="text" class="form-control input-sm" name="calibrate[fn]" placeholder="<optional>" />
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2">Validate</label>
									<div class="col-sm-10">
										<input type="text" class="form-control input-sm" name="validator[value]" placeholder="<optional>" />
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-2"></label>
									<div class="col-sm-10">
										<a href="javascript:;" class="btn btn-success pull-right">Add attribute</a>
									</div>
								</div>
							</form>
						</div>
						<div class="col-sm-8">
							<div class="panel panel-default">
								<div class="panel-heading">Attributes</div>
								<div class="panel-body">
									<table class="table">
										<tbody>
											<tr>
												<td>0</td>
												<td>Temperature</td>
												<td>uint32le</td>
												<td>Value / 10</td>
												<td>Min: -50; Max: 50</td>
											</tr>
											<tr>
												<td>1</td>
												<td>Humidity</td>
												<td>uint16le</td>
												<td>Value / 10</td>
												<td>Min: 0; Max: 1000</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
