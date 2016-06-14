import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isCreating, item } = state.attribute.create
	let { loading: isFetching, item: fetchedItem } = state.attribute.fetch
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

class Create extends React.component {
	render () {
		return (<div>Not implemented.</div>)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
