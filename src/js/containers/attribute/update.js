import { connect } from 'react-redux'
import Update from '../../components/attribute/update'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isUpdating, item } = state.attribute.update
	let { loading: isFetching, item: fetchedItem } = state.attribute.fetch
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
