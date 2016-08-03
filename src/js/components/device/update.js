import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import notify from '../../lib/notify'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isUpdating } = state.device.update
	let { loading: isFetching, item } = state.device.fetch
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
		this.props.onUpdate(data).then(() => {
			notify.updated('device')
		})
	}

	render () {
		let isLoading = (this.props.isFetching || this.props.isUpdating)

		return (
			<div>
				<div class="row">
					<div class="col-sm-offset-2 col-sm-8">
						<Title title="Edit device" loading={isLoading} />
						<Form item={this.props.item} submitLabel="Update device" onSubmit={this.onSubmit.bind(this)} loading={isLoading} />
					</div>
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
