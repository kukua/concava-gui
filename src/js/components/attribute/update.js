import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isUpdating } = state.attribute.update
	let { loading: isFetching, item } = state.attribute.fetch
	return { isFetching, isUpdating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			dispatch(actions.update(data))
		},
	}
}

class Update extends React.Component {
	componentWillMount () {
		this.props.onFetch(this.props.params.id)
	}

	onSubmit (data) {
		this.props.onUpdate(data)
	}

	render () {
		let isLoading = (this.props.isFetching || this.props.isUpdating)

		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Edit attribute" loading={isLoading} />
					<Form item={this.props.item} submitLabel="Update attribute" onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
				</div>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
