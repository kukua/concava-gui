import { connect } from 'react-redux'
import Update from '../../components/devices/Update'
import actions from '../../actions/devices'

const mapStateToProps = (state) => {
	let { isFetching, isUpdating, item } = state.devices
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
