import { connect } from 'react-redux'
import Destroy from '../../components/device/destroy'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isDeleting, item } = state.device.destroy
	let { loading: isFetching, item: fetchedItem } = state.device.fetch
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Destroy)
