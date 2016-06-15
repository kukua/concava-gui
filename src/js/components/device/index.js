import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import actions from '../../actions/device'
import ConfirmModal from '../modals/confirm'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.device.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			dispatch(actions.fetchAll())
		},
		onDestroy (id, cb) {
			dispatch(actions.destroy(id, cb))
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

	componentWillMount () {
		this.props.onFetch()
	}

	onDestroy () {
		let id = this.state.destroy.id
		this.setState({ destroy: {} })
		this.props.onDestroy(id, () => {
			this.props.onFetch()
		})
	}

	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Devices" />
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Device ID</th>
								<th>Name</th>
								<th width="140px" class="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ this.props.isFetching ?
								<tr><td colSpan="3">Loading…</td></tr>
								: _.size(this.props.items) > 0 ?
								_.map(this.props.items, (item) => (
									<tr key={item.id}>
										<td>{item.udid}</td>
										<td>{item.name}</td>
										<td width="140px" class="text-right">
											<Link to={{ pathname: '/devices/' + item.id + '/edit' }}>Edit</Link>
											{' | '}
											<a href="javascript:;" onClick={() => this.setState({ destroy: item })}>Delete</a>
										</td>
									</tr>
								))
								: <tr><td colSpan="3">No items…</td></tr>
							}
						</tbody>
					</table>
					<Link to="/devices/create" class="btn btn-primary pull-right">Add device</Link>
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
