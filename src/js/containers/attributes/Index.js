import { connect } from 'react-redux'
import Index from '../../components/attributes/Index'
import actions from '../../actions/attributes'

const mapStateToProps = (state) => {
	let { isFetching, items } = state.attributes
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch (deviceId) {
			dispatch(actions.fetchByDeviceId(deviceId))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
