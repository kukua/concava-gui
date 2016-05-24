import { connect } from 'react-redux'
import Index from '../../components/devices/Index'
import actions from '../../actions/devices'

const mapStateToProps = (state) => {
	let { isFetching, items } = state.devices
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
