import React from 'react'
import { connect } from 'react-redux'
import Title from '../title'
import Form from './form'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.device.create
	let { loading: isFetching, item: fetchedItem } = state.device.fetch
	if ( ! item) item = fetchedItem
	return { isFetching, isCreating, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onCreate (data) {
			dispatch(actions.create(data))
		}
	}
}

class Create extends React.Component {
	render () {
		return (
			<div class="row">
				<div class="col-sm-offset-2 col-sm-8">
					<Title title="Add device" button="Cancel" />
					<Form submit="Add" />
				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
