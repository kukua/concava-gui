import React from 'react'
import Title from '../Title';
import { Link } from 'react-router'

export default class List extends React.Component {
	render () {
		return (
			<div>
				<div class="row">
					<div class="col-sm-offset-2 col-sm-8">
						<Title title="My devices" />
						<table class="table table-striped">
							<thead>
								<tr>
									<th>Name</th>
									<th width="140px">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Device 1</td>
									<td class="pull-right">
										<Link to="/devices/read/1/">Read</Link>&nbsp;|&nbsp;
										<Link to="/devices/update/1/">Edit</Link>&nbsp;|&nbsp;
										<Link to="/devices/delete/1/">Delete</Link>
									</td>
								</tr>
								<tr>
									<td>Device 2</td>
									<td class="pull-right">
										<Link to="/devices/read/2/">Read</Link>&nbsp;|&nbsp;
										<Link to="/devices/update/2/">Edit</Link>&nbsp;|&nbsp;
										<Link to="/devices/delete/2/">Delete</Link>
									</td>
								</tr>
							</tbody>
						</table>
						<Link to="/devices/create" class="btn btn-primary pull-right">Add device</Link>
					</div>
				</div>
			</div>
		)
	}
}
