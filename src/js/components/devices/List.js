import React from 'react'
import { Link } from 'react-router'
import _ from 'underscore'

import Title from '../Title'

export default class List extends React.Component {
	componentWillMount () {
		this.props.onFetch()
	}
	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="My devices" />
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{ ! this.props.isFetching ? _.map(this.props.items, (item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>Edit</td>
								</tr>
							)) : <tr><td colSpan="2">Loading…</td></tr>}
						</tbody>
					</table>
					<Link to="/devices/create" class="btn btn-primary pull-right">Add device</Link>
				</div>
			</div>
		)
	}
}

List.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool.isRequired,
	items: React.PropTypes.array
}
