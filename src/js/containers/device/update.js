import { connect } from 'react-redux'
import Update from '../../components/device/update'
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Update)
