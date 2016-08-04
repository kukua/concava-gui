import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import { instance as user } from '../../lib/user'
import date from '../../lib/date'
import actions from '../../actions/template'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.template.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (userId) {
			return dispatch(actions.fetchByUserId(userId))
		},
	}
}

class Index extends React.Component {
	loadData () {
		this.props.onFetch(user.id)
	}
	componentWillMount () {
		this.loadData()
	}

	render () {
		return (
			<div>
				<Title title="Templates">
					<Link to="/templates/create" class="btn btn-sm btn-success icon-plus">Add template</Link>
				</Title>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Last updated</th>
						</tr>
					</thead>
					<tbody>
						{ this.props.isFetching ?
							<tr><td colSpan="2">Loading…</td></tr>
							: _.size(this.props.items) > 0 ?
							_.map(this.props.items, (item) => (
								<tr key={item.id} class="click-to-edit" title="Edit"
									onClick={() => this.context.router.replace('/templates/' + item.id + '/edit')}>
									<td>{item.name}</td>
									<td>{date.format(item.updated_at)}</td>
								</tr>
							))
							: <tr><td colSpan="2">No items…</td></tr>
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
