import React from 'react'

import Title from '../Title';
import Table from '../table/Table'

export default class Create extends React.Component {

	getColumns() {
		return {
			title: 'Name',
			actions: 'Actions',
			target: 'attributes'
		}
	}

	getRows(title) {
		return [{
			id: '1',
			name: title + ' #1',
		}, {
			id: '2',
			name: title + ' #2',
		}]
	}

	render() {
		return (
			<div class="row">
				<div class="col-sm-12">
					<Title title="Add attribute" link='Cancel'/>

					<div class="row">
						<div class="col-sm-offset-2 col-sm-8">
							<input type='text' class='form-control' placeholder='Name' />
						</div>
					</div>
					<div class="row">
						<div class="col-sm-4">
							<div class="panel panel-default">
								<div class="panel-heading">Converters</div>
								<div class="panel-body">
									<input type='text' class='form-control input-sm' />
									<button class='btn btn-primary btn-sm pull-right'>Next &raquo;</button>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="panel panel-default">
								<div class="panel-heading">Calibrators</div>
								<div class="panel-body">
									<select class="form-control input-sm">
										<option>int8</option>
										<option>int16le</option>
										<option>int32le</option>
										<option>uint16le</option>
										<option>uint32le</option>
									</select>
									<input type="text" class="form-control" />
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="panel panel-default">
								<div class="panel-heading">Validators</div>
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
