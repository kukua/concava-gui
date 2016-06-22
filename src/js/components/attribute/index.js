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
	let { loading: isReordering } = state.attribute.reorder
	return { isFetching, isReordering, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (templateId) {
			dispatch(actions.fetchByTemplateId(templateId))
		},
		onDestroy (id, cb) {
			dispatch(actions.destroy(id, cb))
		},
		onReorder (templateId, order, cb) {
			dispatch(actions.reorder(templateId, order, cb))
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
		this.props.onFetch(this.props.templateId)
	}

	getItems () {
		return _.sortBy(this.props.items, 'order') // TODO(mauvm): Remove when sorted by API
	}
	move (item, offset) {
		let items = this.getItems()
		let from  = _.indexOf(items, item)
		let to = from + offset
		if (from >= 0 && from < items.length && to >= 0 && to < items.length) {
			items.splice(to, 0, items.splice(from, 1)[0])
		}
		this.props.onReorder(this.props.templateId, _.pluck(items, 'id'), () => {
			this.props.onFetch(this.props.templateId)
		})
	}
	moveUp (item) {
		this.move(item, -1)
	}
	moveDown (item) {
		this.move(item, 1)
	}

	onDestroy () {
		let id = this.state.destroy.id
		this.setState({ destroy: {} })
		this.props.onDestroy(id, () => {
			this.props.onFetch(this.props.templateId)
		})
	}

	render () {
		let items = this.getItems()
		let itemCount = _.size(items)

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
								<th width="200px" class="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ this.props.isFetching ?
								<tr><td colSpan="5">Loading…</td></tr>
								: itemCount > 0 ?
								_.map(items, (item, i) => {
									let { converter, calibrator, validators } = concava(item)

									return (
										<tr key={item.id}>
											<td>{item.name}</td>
											<td>{converter}</td>
											<td>{calibrator}</td>
											<td>{validators}</td>
											<td width="200px" class="text-right">
												{i > 0 ?
													<a href="javascript:;" onClick={() => this.moveUp(item)}>Up</a>
													: 'Up'
												}
												{' | '}
												{i + 1 < itemCount ?
													<a href="javascript:;" onClick={() => this.moveDown(item)}>Down</a>
													: 'Down'
												}
												{' | '}
												<Link to={'/attributes/' + item.id + '/edit'}>Edit</Link>
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
					<Link to={{ pathname: '/attributes/create', query: { template_id: this.props.templateId, order: itemCount } }} class="btn btn-primary pull-right">Add attribute</Link>
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
	templateId: React.PropTypes.number.isRequired,
	isFetching: React.PropTypes.bool,
	isReordering: React.PropTypes.bool,
	items: React.PropTypes.array,
	onFetch: React.PropTypes.func.isRequired,
	onDestroy: React.PropTypes.func.isRequired,
	onReorder: React.PropTypes.func.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
