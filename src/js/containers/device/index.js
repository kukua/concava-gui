import { connect } from 'react-redux'
import Index from '../../components/device/index'
import actions from '../../actions/device'

const mapStateToProps = (state) => {
	let { loading: isFetching, items } = state.device.fetchAll
	return { isFetching, items }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetch () {
			dispatch(actions.fetchAll())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
