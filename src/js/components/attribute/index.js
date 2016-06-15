import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import actions from '../../actions/attribute'
import concava from '../../lib/concava'
import ConfirmModal from '../modals/confirm'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.attribute.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (deviceId) {
			dispatch(actions.fetchByDeviceId(deviceId))
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
		this.props.onFetch(this.props.device.id)
	}

	onDestroy () {
		let id = this.state.destroy.id
		this.setState({ destroy: {} })
		this.props.onDestroy(id, () => {
			this.props.onFetch(this.props.device.id)
		})
	}

	render () {
		let itemCount = _.size(this.props.items)

		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Attributes" />
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Converter</th>
								<th>Calibrator</th>
								<th>Validator(s)</th>
								<th width="140px" class="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ this.props.isFetching ?
								<tr><td colSpan="5">Loading…</td></tr>
								: itemCount > 0 ?
								_.map(this.props.items, (item) => {
									let { converter, calibrator, validators } = concava(item)

									return (
										<tr key={item.id}>
											<td>{item.name}</td>
											<td>{converter}</td>
											<td>{calibrator}</td>
											<td>{validators}</td>
											<td width="140px" class="text-right">
												<Link to={{ pathname: '/attributes/' + item.id + '/edit' }}>Edit</Link>
												{' | '}
												<a href="javascript:;" onClick={() => this.setState({ destroy: item })}>Delete</a>
											</td>
										</tr>
									)
								})
								: <tr><td colSpan="5">No items…</td></tr>
							}
						</tbody>
					</table>
					<Link to={{ pathname: '/attributes/create', query: { template_id: this.props.device.template_id, order: itemCount } }} class="btn btn-primary pull-right">Add attribute</Link>
					<ConfirmModal
						isOpen={ !! this.state.destroy.id}
						title="Delete attribute?"
						onClose={() => this.setState({ destroy: {} })}
						onSubmit={() => this.onDestroy()}>
						<p>Are you sure you want to delete attribute <code>{this.state.destroy.name}</code>?</p>
					</ConfirmModal>
				</div>
			</div>
		)
	}
}

Index.propTypes = {
	device: React.PropTypes.shape({
		id: React.PropTypes.number.isRequired,
		template_id: React.PropTypes.number.isRequired,
	}).isRequired,
	title: React.PropTypes.bool,
	onFetch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool,
	items: React.PropTypes.array,
	onDestroy: React.PropTypes.func.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
