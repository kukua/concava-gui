import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isUpdating } = state.attribute.update
	let { loading: isFetching, item } = state.attribute.fetch
	return { isFetching, isUpdating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			return dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			return dispatch(actions.update(data))
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

	render () {
		let isLoading = (this.props.isFetching || this.props.isUpdating)

		return (
			<div>
				<Title title="Edit attribute" loading={isLoading} />
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
	item: React.PropTypes.object,
}
Update.contextTypes = {
	router: React.PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
