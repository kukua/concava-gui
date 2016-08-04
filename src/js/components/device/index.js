import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import date from '../../lib/date'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.device.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			return dispatch(actions.fetchAll())
		},
	}
}

class Index extends React.Component {
	loadData () {
		this.props.onFetch()
	}
	componentWillMount () {
		this.loadData()
	}

	render () {
		return (
			<div>
				<Title title="Devices">
					<Link to="/devices/create" class="btn btn-sm btn-success icon-plus">Add device</Link>
				</Title>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th style={{ minWidth: '160px' }}>Device ID</th>
							<th>Template</th>
							<th>Last updated</th>
						</tr>
					</thead>
					<tbody>
						{ this.props.isFetching ?
							<tr><td colSpan="4">Loading…</td></tr>
							: _.size(this.props.items) > 0 ?
							_.map(this.props.items, (item) => (
								<tr key={item.id} class="click-to-edit"
									onClick={() => this.context.router.replace('/devices/' + item.id + '/edit')}>
									<td>{item.name}</td>
									<td style={{ minWidth: '160px' }}>{item.udid}</td>
									<td>{item.template && item.template.name}</td>
									<td>{date.format(item.updated_at)}</td>
								</tr>
							))
							: <tr><td colSpan="4">No items…</td></tr>
						}
					</tbody>
				</table>
			</div>
		)
	}
}

Index.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array,
}
Index.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
