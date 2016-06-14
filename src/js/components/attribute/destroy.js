import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isDeleting, item } = state.attribute.destory
	let { loading: isFetching, item: fetchedItem } = state.attribute.fetch
	if ( ! item) item = fetchedItem
	return { isFetching, isDeleting, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onDestroy (id) {
			dispatch(actions.destroy(id))
		}
	}
}

class Destroy extends React.Component {
	render () {
		return (<div>Not implemented.</div>)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Destroy)
