import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import notify from '../../lib/notify'
import concava from '../../lib/concava'
import date from '../../lib/date'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.attribute.fetchAll
	let { loading: isReordering } = state.attribute.reorder
	return { isFetching, isReordering, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (templateId) {
			return dispatch(actions.fetchByTemplateId(templateId))
		},
		onReorder (templateId, order) {
			return dispatch(actions.reorder(templateId, order))
		},
	}
}

class Index extends React.Component {
	loadData () {
		this.props.onFetch(this.props.templateId)
	}
	componentWillMount () {
		this.loadData()
	}
	componentWillReceiveProps (next) {
		if (next.templateId !== this.props.templateId) {
			setTimeout(this.loadData.bind(this), 1)
		}
	}

	formatCalibrator (val) {
		if ( ! val) return ''

		let line = ('' + val).trim().split('\n')[0].trim() // First non-empty line
		let comment = /^(\/[\/\*]{1}\s*)|(\s*\*\/)$/g // Match "// " and "/* ... */"

		if (line.match(comment) !== null) {
			line = line.replace(comment, '')
			return (<i>[ {line} ]</i>)
		}

		return line
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
		this.props.onReorder(this.props.templateId, _.pluck(items, 'id')).then(() => {
			notify.action('attributes', 'reordered')
			this.loadData()
		})
	}
	moveUp (item) {
		this.move(item, -1)
	}
	moveDown (item) {
		this.move(item, 1)
	}

	render () {
		let items = this.getItems()
		let itemCount = _.size(items)

		return (
			<div>
				<Title title="Attributes" backButton={false}>
					<Link to={{ pathname: '/attributes/create', query: { template_id: this.props.templateId, order: itemCount } }} class="btn btn-sm btn-success icon-plus">Add attribute</Link>
				</Title>
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Converter</th>
							<th>Calibrator</th>
							<th>Validator(s)</th>
							<th>Last updated</th>
							<th width="100px" class="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{ this.props.isFetching ?
							<tr><td colSpan="6">Loading…</td></tr>
							: itemCount > 0 ?
							_.map(items, (item, i) => {
								let { converter, calibrator, validators } = concava(item)

								return (
									<tr key={item.id} class="click-to-edit"
										onClick={() => this.context.router.replace('/attributes/' + item.id + '/edit')}>
										<td>{item.name}</td>
										<td>{converter}</td>
										<td>{this.formatCalibrator(calibrator)}</td>
										<td>{validators}</td>
										<td>{date.format(item.updated_at)}</td>
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
										</td>
									</tr>
								)
							})
							: <tr><td colSpan="6">No items…</td></tr>
						}
					</tbody>
				</table>
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
	onReorder: React.PropTypes.func.isRequired,
}
Index.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
