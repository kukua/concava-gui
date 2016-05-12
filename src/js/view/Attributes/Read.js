import React from 'react'

import Title from '../Title';
import Table from '../Table/Table'

export default class Read extends React.Component {
	render() {
		return (
			<div class="row">
				<div class="col-sm-12">
					<Title title="Device Attributes" link='Cancel'/>

					<div class="row">
						<div class="col-sm-8">
							<form class="form form-horizontal">
								<div class="form-group">
									<label class="control-label col-sm-4">Name</label>
									<div class="col-sm-6">
										<input type="text" name="attr[name]" class="form-control" />
									</div>
								</div>

								<div class="form-group">
									<label class="control-label col-sm-4">Type</label>
									<div class="col-sm-6">
										<select class="form-control">
											<option>int8</option>
											<option>int16le</option>
											<option>int32le</option>
											<option>uint16le</option>
											<option>uint32le</option>
										</select>
									</div>
								</div>
							</form>
						</div>
						<div class="col-sm-4">
							<div class="panel panel-default">
								<div class="panel-heading">Order</div>
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
