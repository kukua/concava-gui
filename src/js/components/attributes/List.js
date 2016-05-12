import React from 'react'
import { Link } from 'react-router'
import _ from 'underscore'

export default class List extends React.Component {
	componentWillMount () {
		this.props.onFetch()
	}


	render () {
		return (
			<div class="row">
				<div class="col-sm-12">
					<table class="table table-striped">
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>convert</th>
								<th>calibrate</th>
								<th>validate</th>
							</tr>
						</thead>

						<tbody>
							{ ! this.props.isFetching ? _.map(this.props.items, (item) => (
								<tr key={ item.id }>
									<td>{ item.id }</td>
									<td>{ item.name }</td>
									<td>{ item.convert }</td>
									<td>{ item.calibrate }</td>
									<td>{ item.validate }</td>
								</tr>
							)) : <tr><td colSpan="5">Loading…</td></tr>}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

List.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array
}
