import React from 'react'
import _ from 'underscore'
import { Link } from 'react-router'
import Title from '../title'
import { connect } from 'react-redux'
import notify from '../../lib/notify'
import concava from '../../lib/concava'
import { Table } from '../../lib/table'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	var { loading: isFetching, items } = state.attribute.fetchAll
	var { loading: isReordering } = state.attribute.reorder
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

		var line = ('' + val).trim().split('\n')[0].trim() // First non-empty line
		var comment = /^(\/[\/\*]{1}\s*)|(\s*\*\/)$/g // Match "// " and "/* ... */"

		if (line.match(comment) !== null) {
			line = line.replace(comment, '')
			return (<i>[ {line} ]</i>)
		}

		return line
	}

	getItems () {
		return _.sortBy(this.props.items, 'order') // TODO(mauvm): Remove when sorted by API
	}
	move (id, offset) {
		var items = this.getItems()
		var from  = _.indexOf(items, _.find(items, (item) => item.id === id))
		var to = from + offset

		if (from >= 0 && from < items.length && to >= 0 && to < items.length) {
			items.splice(to, 0, items.splice(from, 1)[0])
		}

		this.props.onReorder(this.props.templateId, _.pluck(items, 'id')).then(() => {
			notify.action('attributes', 'reordered')
			this.loadData()
		})
	}
	moveUp (id) {
		this.move(id, -1)
	}
	moveDown (id) {
		this.move(id, 1)
	}

	render () {
		var isLoading = (this.props.isFetching)
		var items = this.getItems()
		var itemCount = _.size(items)

		return (
			<div>
				<Title title="Attributes" backButton={false}>
					<Link to={{ pathname: '/attributes/create', query: { template_id: this.props.templateId, order: itemCount } }} class="btn btn-sm btn-success icon-plus">Add attribute</Link>
				</Title>
				<Table loading={isLoading}
					columns={{
						name: {
							label: 'Name',
							key: 'name',
						},
						converter: {
							label: 'Converter',
							value: (val, { rowData: item }) => concava(item).converter,
						},
						calibrator: {
							label: 'Calibrator',
							value: (val, { rowData: item }) => this.formatCalibrator(concava(item).calibrator),
						},
						validators: {
							label: 'Validators',
							value: (val, { rowData: item }) => concava(item).validators,
						},
						updatedAt: {
							label: 'Last updated',
							key: 'updated_at',
							isDate: true,
						},
						actions: {
							label: 'Actions',
							value: (val, { rowData: item, rowIndex: i }) => (
								<div class="btn-group" onClick={(ev) => ev.stopPropagation()}>
									<button class="btn btn-sm btn-success icon-up-open-big icon-only"
										onClick={() => this.moveUp(item.id)} disabled={i <= 0} title="Move up" />
									<button class="btn btn-sm btn-success icon-down-open-big icon-only"
										onClick={() => this.moveDown(item.id)} disabled={i + 1 >= itemCount} title="Move down" />
								</div>
							),
							cellProps: {
								className: 'text-right',
								style: { minWidth: '100px', padding: '1px 3px' },
							},
						},
					}}
					rows={items}
					onRowClick={(item) => this.context.router.replace('/attributes/' + item.id + '/edit')} />
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
