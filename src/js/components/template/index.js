import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import { instance as user } from '../../lib/user'
import notify from '../../lib/notify'
import date from '../../lib/date'
import actions from '../../actions/template'
import ConfirmModal from '../modals/confirm'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.template.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (userId) {
			return dispatch(actions.fetchByUserId(userId))
		},
		onDestroy (id) {
			return dispatch(actions.destroy(id))
		},
	}
}

class Index extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			destroy: {},
		}
	}

	loadData () {
		this.props.onFetch(user.id)
	}
	componentWillMount () {
		this.loadData()
	}

	onDestroy () {
		let id = this.state.destroy.id
		this.setState({ destroy: {} })
		this.props.onDestroy(id).then(() => {
			notify.destroyed('template')
			this.loadData()
		})
	}

	render () {
		return (
			<div>
				<Title title="Templates">
					<Link to="/templates/create" class="btn btn-sm btn-success icon-plus">Add template</Link>
				</Title>
				<table class="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Last updated</th>
							<th width="140px" class="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{ this.props.isFetching ?
							<tr><td colSpan="3">Loading…</td></tr>
							: _.size(this.props.items) > 0 ?
							_.map(this.props.items, (item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>{date.format(item.updated_at)}</td>
									<td width="140px" class="text-right">
										<Link to={'/templates/' + item.id + '/edit'}>Edit</Link>
										{' | '}
										<a href="javascript:;" onClick={() => this.setState({ destroy: item })}>Delete</a>
									</td>
								</tr>
							))
							: <tr><td colSpan="3">No items…</td></tr>
						}
					</tbody>
				</table>
				<ConfirmModal
					isOpen={ !! this.state.destroy.id}
					title="Delete template?"
					onClose={() => this.setState({ destroy: {} })}
					onSubmit={() => this.onDestroy()}>
					<p>Are you sure you want to delete template <code>{this.state.destroy.name}</code>?</p>
				</ConfirmModal>
			</div>
		)
	}
}

Index.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array,
	onDestroy: React.PropTypes.func.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
