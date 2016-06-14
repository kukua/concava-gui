import { connect } from 'react-redux'
import Create from '../../components/device/create'
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Create)
