import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	var { loading: isUpdating } = state.attribute.update
	var { loading: isFetching, item } = state.attribute.fetch
	var { loading: isDestroying } = state.attribute.destroy
	return { isFetching, isUpdating, isDestroying, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			return dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			return dispatch(actions.update(data))
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
		this.props.onUpdate(data).then((item) => {
			notify.updated('attribute')
			this.context.router.replace('/templates/' + item.template_id + '/edit')
		})
	}
	onDestroy () {
		if ( ! confirm('Are you sure? This cannot be undone.')) return

		this.props.onDestroy(this.props.item.id).then((item) => {
			notify.destroyed('attribute')
			this.context.router.replace('/templates/' + item.template_id + '/edit')
		})
	}

	render () {
		var isLoading = (this.props.isFetching || this.props.isUpdating || this.props.isDestroying)

		return (
			<div>
				<Title title="Edit attribute" loading={isLoading}>
					<a href="javascript:;" class="btn btn-sm btn-danger icon-trash" onClick={() => this.onDestroy()}>Destroy</a>
				</Title>
				<Form item={this.props.item} submitLabel="Update attribute" onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
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
