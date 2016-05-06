import React from 'react'
import Title from '../Title'
import { Link } from 'react-router'

export default class Read extends React.Component {
	render () {
		const { params } = this.props
		const name = "My device #" + params.id;
		return (
			<div>
				<div class="row">
					<div class="col-sm-8 col-sm-offset-2">
						<Title title={name} subtitle="b00bb00bb00bb00b" link="Back"/>
						<table class="table table-striped">
							<thead>
								<tr>
									<th>Attribute</th>
									<th width="140px">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Temperature</td>
									<td class="pull-right">
										<Link to="/attributes/read/1/">Read</Link>&nbsp;|&nbsp;
										<Link to="/attributes/update/1/">Edit</Link>&nbsp;|&nbsp;
										<Link to="/attributes/delete/1/">Delete</Link>
									</td>
								</tr>
								<tr>
									<td>Humidity</td>
									<td class="pull-right">
										<Link to="/attributes/read/2/">Read</Link>&nbsp;|&nbsp;
										<Link to="/attributes/update/2/">Edit</Link>&nbsp;|&nbsp;
										<Link to="/attributes/delete/2/">Delete</Link>
									</td>
								</tr>
							</tbody>
						</table>
						<button class="btn btn-primary pull-right">Add attribute</button>
					</div>
				</div>
			</div>
		)
	}
}
