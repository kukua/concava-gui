import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.device.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			dispatch(actions.fetchAll())
		}
	}
}

class Index extends React.Component {
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
							{ this.props.isFetching ?
								<tr><td colSpan="2">Loading…</td></tr>
								: _.size(this.props.items) > 0 ?
								_.map(this.props.items, (item) => (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td width="140px">
											<Link to={{ pathname: '/devices/update/' + item.id }}>Edit</Link>
											{' | '}
											<Link to={{ pathname: '/devices/delete/' + item.id }}>Delete</Link>
										</td>
									</tr>
								))
								: <tr><td colSpan="2">No items.</td></tr>
							}
						</tbody>
					</table>
					<Link to="/devices/create" class="btn btn-primary pull-right">Add device</Link>
				</div>
			</div>
		)
	}
}

Index.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
