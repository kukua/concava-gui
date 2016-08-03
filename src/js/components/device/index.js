import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import notify from '../../lib/notify'
import actions from '../../actions/device'
import ConfirmModal from '../modals/confirm'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.device.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			return dispatch(actions.fetchAll())
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
		this.props.onFetch()
	}
	componentWillMount () {
		this.loadData()
	}

	onDestroy () {
		let id = this.state.destroy.id
		this.setState({ destroy: {} })
		this.props.onDestroy(id).then(() => {
			notify.destroyed('device')
			this.loadData()
		})
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Devices">
						<Link to="/devices/create" class="btn btn-sm btn-success">Add device</Link>
					</Title>
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th width="160px">Device ID</th>
								<th>Template</th>
								<th width="140px" class="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ this.props.isFetching ?
								<tr><td colSpan="4">Loading…</td></tr>
								: _.size(this.props.items) > 0 ?
								_.map(this.props.items, (item) => (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td width="160px">{item.udid}</td>
										<td>{item.template && item.template.name}</td>
										<td width="140px" class="text-right">
											<Link to={'/devices/' + item.id + '/edit'}>Edit</Link>
											{' | '}
											<a href="javascript:;" onClick={() => this.setState({ destroy: item })}>Delete</a>
										</td>
									</tr>
								))
								: <tr><td colSpan="4">No items…</td></tr>
							}
						</tbody>
					</table>
					<ConfirmModal
						isOpen={ !! this.state.destroy.id}
						title="Delete device?"
						onClose={() => this.setState({ destroy: {} })}
						onSubmit={() => this.onDestroy()}>
						<p>Are you sure you want to delete device <code>{this.state.destroy.udid}</code>?</p>
					</ConfirmModal>
				</div>
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
