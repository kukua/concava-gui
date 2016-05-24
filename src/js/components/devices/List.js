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
								<th width="140px">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ ! this.props.isFetching ? _.map(this.props.items, (item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td width="140px">
										<Link to={{ pathname: '/devices/update/' + item.udid }}>Edit</Link>
										&nbsp;|&nbsp;
										<Link to={{ pathname: '/devices/delete/' + item.udid }}>Delete</Link>
									</td>
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
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.object
}
