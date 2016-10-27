import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/template'
import AttributeIndex from '../attribute/index'

const mapStateToProps = (state) => {
	var { loading: isUpdating } = state.template.update
	var { loading: isFetching, item } = state.template.fetch
	var { loading: isDuplicating } = state.template.duplicate
	var { loading: isDestroying } = state.template.destroy
	return { isFetching, isUpdating, isDuplicating, isDestroying, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			return dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			return dispatch(actions.update(data))
		},
		onDuplicate (id) {
			return dispatch(actions.duplicate(id))
		},
		onDestroy (id) {
			return dispatch(actions.destroy(id))
		},
	}
}

class Update extends React.Component {
	componentWillMount () {
		this.props.onFetch(this.props.params.id)
	}

	onSubmit (data) {
		this.props.onUpdate(data).then(() => {
			notify.updated('template')
		})
	}
	onDuplicate () {
		this.props.onDuplicate(this.props.item.id).then((item) => {
			notify.action('template', 'duplicated')
			this.context.router.replace('/templates/' + item.id + '/edit')
		})
	}
	onDestroy () {
		if ( ! confirm('Are you sure? This cannot be undone.')) return

		this.props.onDestroy(this.props.item.id).then(() => {
			notify.destroyed('template')
			this.context.router.replace('/templates')
		})
	}

	render () {
		var isLoading = (this.props.isFetching || this.props.isUpdating
			|| this.props.isDuplicating || this.props.isDestroying)

		return (
			<div>
				<Title title="Edit template" loading={isLoading}>
					<a href="javascript:;" class="btn btn-sm btn-warning icon-docs" onClick={() => this.onDuplicate()}>Duplicate</a>
					<a href="javascript:;" class="btn btn-sm btn-danger icon-trash" onClick={() => this.onDestroy()}>Destroy</a>
				</Title>
				<Form item={this.props.item} submitLabel="Update template" onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
				{this.props.item &&
					<div>
						<div class="spacer" />
						<AttributeIndex templateId={this.props.item.id} />
					</div>
				}
			</div>
		)
	}
}

Update.propTypes = {
	onFetch: React.PropTypes.func.isRequired,
	params: React.PropTypes.shape({
		id: React.PropTypes.string.isRequired,
	}).isRequired,
	isFetching: React.PropTypes.bool,
	onUpdate: React.PropTypes.func.isRequired,
	isUpdating: React.PropTypes.bool,
	onDuplicate: React.PropTypes.func.isRequired,
	isDuplicating: React.PropTypes.bool,
	onDestroy: React.PropTypes.func.isRequired,
	isDestroying: React.PropTypes.bool,
	item: React.PropTypes.object,
}
Update.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
