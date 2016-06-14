import { connect } from 'react-redux'
import Index from '../../components/attribute/index'
import actions from '../../actions/attribute'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.attributes.fetchAll
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
