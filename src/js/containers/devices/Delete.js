import { connect } from 'react-redux'
import Delete from '../../components/devices/Delete'
import actions from '../../actions/devices'

const mapStateToProps = (state) => {
	let { isFetching, isDeleting, item } = state.devices
	return { isFetching, isDeleting, item }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (id) {
			dispatch(actions.fetch(id))
		},
		onDelete (id) {
			dispatch(actions.delete(id))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Delete)
