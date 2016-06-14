import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isUpdating, item } = state.device.update
	let { loading: isFetching, item: fetchedItem } = state.device.fetch
	if ( ! item) item = fetchedItem
	return { isFetching, isUpdating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onUpdate (data) {
			dispatch(actions.update(data))
		}
	}
}

class Update extends React.Component {
	render () {
		return (
			<div class="row">
				<div class="col-sm-12">
					<Title title="Edit device" button="Cancel" />
					<Form submit="Edit" />
				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
