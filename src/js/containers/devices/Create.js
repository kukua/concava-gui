import { connect } from 'react-redux'
import Create from '../../components/devices/Create'
import actions from '../../actions/devices'

const mapStateToProps = (state) => {
	let { isFetching, isCreating, item } = state.devices
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
